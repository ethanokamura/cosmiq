import {
  BaseDirectory,
  create,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegQuestionCircle, FaRegFileAlt } from "react-icons/fa";

export default function Editor({ filePath }: { filePath: string }) {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from environment variables.
    const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (key) {
      setApiKey(key);
    } else {
      console.error("GEMINI_API_KEY is not defined");
    }
  }, []);

  // 1. Load Markdown from file
  useEffect(() => {
    const loadFile = async () => {
      try {
        const content = await readTextFile(filePath, {
          baseDir: BaseDirectory.Document,
        });
        setMarkdownContent(content);
      } catch (error) {
        console.error("Failed to read file:", error);
      }
    };

    loadFile();
  }, [filePath]);

  // 2. Only init editor after markdown is loaded
  const editor = useEditor(
    {
      extensions: [StarterKit, Markdown],
      content: markdownContent ?? "Hello World",
      onUpdate({ editor }) {
        const md = editor.storage.markdown.getMarkdown();
        writeTextFile(filePath, md, {
          baseDir: BaseDirectory.Document,
        }).catch((err) => {
          console.error("Failed to save file:", err);
        });
      },
    },
    [markdownContent],
  );

  async function generateSummary() {
    if (!apiKey || !filePath || !markdownContent) return;
  
    try {
      const path = `${filePath.substring(0,filePath.length - 3)}-summary.md`

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent({
        contents: [{ parts: [{ text: markdownContent as string }], role: "user" }],
      });

      const response = await result.response;
      const text = response.text();

      const content = await writeTextFile(path, text,{
        baseDir: BaseDirectory.Document,
      });

    } catch (error) {
      console.error("Failed to read file or generate summary:", error);
    }
  }

  if (!editor) return <p>Loading...</p>;

  return (

    <div>
       <EditorContent editor={editor} />
       <div className="flex gap-4 items-center fixed right-10 bottom-4">
        <Link to={`/quiz/${filePath}`}>
          <button
            type="button"
            className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-accent/50"
          >
            <FaRegQuestionCircle className="text-accent" />
            <span className="text-text text-base">Quiz</span>
          </button>
        </Link>
        <button
          type="button"
          onClick={generateSummary}
          className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-accent/50"
        >
          <FaRegFileAlt className="text-accent" />
          <span className="text-text text-base">Summary</span>
        </button>
      </div>
    </div>
  );
}
