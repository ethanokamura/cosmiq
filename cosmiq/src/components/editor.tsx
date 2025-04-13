import {
  BaseDirectory,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegQuestionCircle, FaRegFileAlt } from "react-icons/fa";

export default function Editor({ filePath }: { filePath: string }) {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

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
        <Link to={`/summary/${filePath}`}>
          <button
            type="button"
            className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-accent/50"
          >
            <FaRegFileAlt className="text-accent" />
            <span className="text-text text-base">Summary</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
