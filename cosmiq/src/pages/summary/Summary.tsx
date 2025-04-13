import { GoogleGenerativeAI } from "@google/generative-ai";
import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Markdown } from "tiptap-markdown";

export default function Summary() {
  const { path } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!path) {
      navigate("/");
      return;
    }
    // loadDirs();
  }, [path, navigate]);

  console.log(`summarizing ${path}`);

  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null); // State for the API Key.
  const [editor, setEditor] = useState<any>(null); // State for the editor.

  useEffect(() => {
    // Load API key from environment variables.
    const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (key) {
      setApiKey(key);
    } else {
      console.error("GEMINI_API_KEY is not defined");
    }
  }, []);

  // 1. Load Markdown from file and generate summary
  useEffect(() => {
    const loadFileAndGenerate = async () => {
      if (!apiKey || !path) return;
  
      try {
        const content = await readTextFile(path, {
          baseDir: BaseDirectory.Document,
        });
  
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
        const result = await model.generateContent({
          contents: [{ parts: [{ text: content }], role: "user" }], // Corrected line
        });
  
        const response = await result.response;
        const text = response.text();
  
        setMarkdownContent(text);
      } catch (error) {
        console.error("Failed to read file or generate summary:", error);
      }
    };
  
    loadFileAndGenerate();
  }, [path, apiKey]);

  // 2. Only init editor after markdown is loaded
  useEffect(() => {
    if (markdownContent !== null) {
      const newEditor = useEditor(
        {
          extensions: [StarterKit, Markdown],
          content: markdownContent ?? "Hello World",
          onUpdate({ editor }) {
            const md = editor.storage.markdown.getMarkdown();
            writeTextFile(path!, md, {
              baseDir: BaseDirectory.Document,
            }).catch((err) => {
              console.error("Failed to save file:", err);
            });
          },
        },
        [markdownContent]
      );
      setEditor(newEditor);
    }
  }, [markdownContent, path]);

  if (!editor) return <p>Loading...</p>;

  return (
    <main>
      <h1>Summary Page</h1>
      <EditorContent editor={editor} />
    </main>
  );
}