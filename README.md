# `cosmiq` — CruzHacks 2025 Project

This is the main project document for **cosmiq**, built during CruzHacks 2025.

---

## 🧠 General Idea

A smart, markdown-based note-taking app designed for students:

- A WYSIWYG markdown editor for writing school notes
- Instantly summarize content with a click
- Generate challenging quizzes with detailed explanations

---

## 🛠️ Tech Stack

- **React** – Frontend
- **Tailwind CSS** – Styling
- **Tauri** – Desktop backend with Rust
- **Gemini APIs** – AI-powered summarization & quiz generation

---

## 🖥️ Frontend Pages

- **Home Page** - Interact with your local files system to access your directories 
- **Edit Files Page** – Write and manage markdown notes  
- **Summary Page** – Instantly generate cheat-sheets  
- **Quiz Page** – Take dynamic quizzes based on your notes  

---

## 🧰 Backend Responsibilities

- File system interaction via Tauri
- Integration with Gemini APIs for AI-powered features

---

## ✨ Features

- Write notes, papers, or documentation
- Summarize notes to create study guides or cheat-sheets
- Generate dynamic quizzes in one click

---

## How to Run:

To launch the the desktop application itself, execute the following commands:

```sh
cd cosmiq
npm i
npm run tauri dev
```

In a seperate terminal you can spin up backend with the following commands:
```sh
cd server
docker-compose up --build
```

Note that in order to run the backend, you will need a Gemini API key