# 🪐 cosmiq

> A smart note-taking desktop app built for students — powered by markdown, AI, and you.

---

## ✨ Overview

**cosmiq** is a WYSIWYG markdown editor designed for students to supercharge their study sessions. Write notes, summarize them instantly, and generate quizzes with detailed explanations — all in a beautiful and intuitive interface.

Built during **CruzHacks 2025**, cosmiq combines the flexibility of markdown with the power of AI.

---

## 🔧 Features

- ✍️ Write notes, papers, and documentation in markdown
- ⚡ One-click summaries for quick study guides
- 🧠 AI-generated quizzes with detailed answers
- ✨ Optional grammar and clarity enhancements

---

## 🧰 Tech Stack

- **React** – Frontend
- **Tailwind CSS** – Styling
- **Tauri** – Cross-platform desktop app framework (Rust-based backend)
- **Gemini API** – AI for summarization & quiz generation

---

## 🖼 App Structure

```
cosmiq/
├── public/               # Static assets
├── src/                  # React frontend code
├── src-tauri/            # Tauri (Rust) backend and config
└── README.md             # This file!
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cosmiq.git
cd cosmiq
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

This command will start the development server and launch the Tauri app:

```bash
npm run tauri dev
```

Make sure you have the required tools installed for [Tauri development](https://tauri.app/v1/guides/getting-started/prerequisites/), including:

- **Rust**
- **Node.js**
- **Tauri CLI**
- A supported package manager (`npm`, `yarn`, or `pnpm`)

---

## 🧪 Example Use Cases

- Writing lecture notes and instantly turning them into a cheat sheet
- Creating flashcards or quizzes before an exam
- Polishing an essay by fixing grammar and clarity with AI

---

## 🧠 Contributors

- **Alex** – Gemini integration, Rust backend, Git operations
- **Ethan Okamura** – Frontend architecture, design, UX, and AI integration, Rust backend

---

## 💬 Feedback

We'd love to hear your thoughts! Open an issue or submit a pull request 🚀

