# Slotify ⏳ — The Last-Minute Life Saver

Slotify is an intelligent, context-aware AI schedule optimizer designed to save you from deadline panic. By blending structured task creation with a "Brain Dump" AI natural language parser, Slotify restructures your chaotic days into optimized, step-by-step timelines, keeping you focused when pressure strikes.

🚀 **Live Demo:** [slotify-red.vercel.app](https://slotify-red.vercel.app/)

---

## ✨ Features

### 🧠 1. Dual-Input Task Engine
* **Structured Task Addition:** Add tasks manually with custom metadata including duration, hard deadlines, category tags (Study, Work, Personal, Chore, Health), and color-coded urgency levels (High, Medium, Low).
* **Brain Dump (AI Parser):** Too stressed to organize? Simply dump your unstructured thoughts or dictate hands-free via microphone. The integrated AI parses your text, extracts specific tasks, and fits them perfectly into your available timeframe.

### 🚨 2. Emergency Sprint Mode
* When a critical deadline is looming, activate **Emergency Focus Mode**. 
* It immediately hides minor or low-priority distractions, upgrades remaining tasks to high urgency, and increases the frequency of cognitive nudges so you can hyper-focus entirely on high-stakes delivery.

### 📅 3. Interactive Timeline & Weekly Planner
* **Structured Daily Timeline:** Watch your tasks automatically adapt into an AI-restructured, chronological workflow.
* **Weekly Grid Planner:** View a clean layout of your upcoming week to track pacing.
* **Universal Export (.ics):** Export your generated schedule smoothly to Google Calendar, Apple Calendar, or Outlook to leverage native operating system notifications on desktop and mobile even when the browser is closed.

### 🔊 4. Context-Aware Nudge Center
* **Speech Synthesis Alarms:** The application leverages advanced Text-to-Speech (TTS) reminders that audibly voice out warnings as crucial deadlines approach.
* **Simulation Suite:** Test the scheduler's proactive real-time behaviors using built-in simulation triggers.

### 🤖 5. AI Productivity Advisor
* Interact with a dedicated conversational productivity coach embedded directly within your dashboard.
* Get quick, single-click strategies for:
    * 📊 **Workload Analysis** to understand scheduling bottlenecks.
    * 😰 **Overcoming Friction** and breaking through procrastination.
    * ⏱️ **Custom Pomodoro Plans** optimized for your active task list.

---

## 🛠️ Tech Stack

* **Frontend:** React, Next.js (App Router / Pages), Tailwind CSS
* **Deployment:** Vercel
* **Interactivity & State:** Context API / React Hooks
* **AI Integration:** Large Language Model (LLM) API wrapper for Natural Language Parsing & Productivity Advisory
* **Browser APIs:** Web Speech API (Speech Synthesis for voice alerts, Web Speech Recognition for dictation)

---

## ⚙️ Installation & Local Setup

To run Slotify locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/Slotify.git](https://github.com/YOUR_GITHUB_USERNAME/Slotify.git)
   cd Slotify
