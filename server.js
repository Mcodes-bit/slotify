// server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

console.log("MY API KEY IS:", process.env.GEMINI_API_KEY ? "LOADED (Starts with " + process.env.GEMINI_API_KEY.substring(0, 3) + ")" : "NOT FOUND");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-3.5-flash";

// 1. DYNAMIC SCHEDULER ENDPOINT
app.post('/api/schedule', async (req, res) => {
    try {
        const { tasks, timeframe, habits, goals } = req.body;

        const model = genAI.getGenerativeModel({ 
            model: MODEL_NAME,
            generationConfig: { responseMimeType: "application/json" } 
        });

        const prompt = `
        You are an elite AI productivity companion.
        The user has these structured tasks: ${JSON.stringify(tasks)}
        Their available timeframe today: "${timeframe}"
        They want to maintain these habits: ${JSON.stringify(habits || [])}
        They have these long-term goals: ${JSON.stringify(goals || [])}
        
        Act autonomously to:
        1. Create a realistic daily schedule within their available timeframe.
        2. Prioritize high-priority tasks and tasks with pressing deadlines.
        3. Break down tasks if their duration exceeds available slots.
        4. Dynamically insert habits (e.g. 10-15 minute reminders or breaks) at optimal intervals (e.g., rest after deep work).
        5. Allocate a small 30-minute block for a concrete, actionable starter task for their active long-term goals.
        6. Provide short, motivating "reasoning" (AI Note) for each schedule item explaining why it is placed there.
        
        Return ONLY a JSON array of objects. Use exactly this schema for each object:
        {"time": "string (e.g., 2:00 PM - 3:00 PM)", "task": "string", "priority": "High or Medium or Low or Habit or Goal", "reasoning": "string"}
        `;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        const schedule = JSON.parse(text);
        res.json(schedule);

    } catch (error) {
        console.error("🔥 SCHEDULER ERROR:", error);
        res.status(500).json({ error: "Failed to generate AI schedule: " + error.message });
    }
});

// 2. AI PRODUCTIVITY ADVISOR ENDPOINT (CHAT)
app.post('/api/advisor', async (req, res) => {
    try {
        const { message, history, currentTasks } = req.body;

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        let chatContext = `You are Slotify's AI Productivity Advisor. 
        Your mission is to help the user beat procrastination, organize their day, and build strong habits.
        Be highly practical, empathetic, and direct. Keep responses relatively concise and punchy.
        Use bullet points and markdown. Do not waste words on generic pleasantries.
        
        The user's current tasks are: ${JSON.stringify(currentTasks || [])}.`;

        const contents = [];
        
        // Add chat history context if present
        if (history && history.length > 0) {
            history.forEach(msg => {
                contents.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                });
            });
        }
        
        // Add current instruction with context
        contents.push({
            role: 'user',
            parts: [{ text: `${chatContext}\n\nUser query: ${message}` }]
        });

        const result = await model.generateContent({ contents });
        const text = await result.response.text();
        res.json({ response: text });

    } catch (error) {
        console.error("🔥 ADVISOR ERROR:", error);
        res.status(500).json({ error: "Failed to query AI Advisor: " + error.message });
    }
});

// 3. GOAL DECOMPOSITION ENDPOINT
app.post('/api/decompose', async (req, res) => {
    try {
        const { goal } = req.body;

        const model = genAI.getGenerativeModel({ 
            model: MODEL_NAME,
            generationConfig: { responseMimeType: "application/json" } 
        });

        const prompt = `
        You are an elite execution coach.
        The user has a long-term goal: "${goal}"
        
        Decompose this goal into exactly 5 highly actionable, bite-sized steps that can be completed daily.
        Make sure each step is clear, specific, and can be completed in under 45 minutes.
        
        Return ONLY a JSON array of strings. Do not include markdown wraps other than JSON.
        Example output format: ["Identify target audience (30 min)", "Outline core features (40 min)", ...]
        `;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        const steps = JSON.parse(text);
        res.json(steps);

    } catch (error) {
        console.error("🔥 DECOMPOSE ERROR:", error);
        res.status(500).json({ error: "Failed to decompose goal: " + error.message });
    }
});

// 4. KICKSTART GUIDE & ASSIGNMENT SOLUTIONS GENERATOR
app.post('/api/generate-docs', async (req, res) => {
    try {
        const { taskTitle, taskDescription } = req.body;

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `
        You are an elite academic tutor and technical documentation generator.
        
        The user needs help starting the following task:
        Task Title: "${taskTitle}"
        Task Description: "${taskDescription || 'No description provided'}"
        
        Generate a comprehensive Markdown document to help them start and finish this task successfully.
        
        Structure your document with these sections:
        1. **Overview & Objective**: A brief summary of what needs to be done.
        2. **Core Concepts Explained**: Break down any difficult technical or academic concepts related to this task into simple terms.
        3. **Step-by-Step Execution Plan**: Clear milestones from start to completion.
        4. **Solved Example / Boilerplate Draft**:
           - If the task is academic (e.g. math, coding, physics, analysis), provide a simplified, solved mock-example that illustrates the method/approach they should take, with explanations of each step.
           - If the task is administrative or professional (e.g. writing a report, drafting an email, setting up a database), provide a complete, copyable markdown boilerplate/template with placeholders they can fill in.
        5. **Common Pitfalls & Pro-Tips**: How to avoid mistakes and save time.
        
        Write in a clean, encouraging, professional tone. Format the output with clear headings, lists, and code blocks where applicable.
        `;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        res.json({ markdown: text });

    } catch (error) {
        console.error("🔥 DOCS GENERATOR ERROR:", error);
        res.status(500).json({ error: "Failed to generate starting documentation: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is successfully running on http://localhost:${PORT}`);
});
