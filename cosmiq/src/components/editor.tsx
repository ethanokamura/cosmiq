import {
  BaseDirectory,
  exists,
  mkdir,
  readTextFile,
  stat,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { useEffect, useState } from "react";
import { FaRegQuestionCircle, FaRegFileAlt } from "react-icons/fa";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight';
import { Mathematics } from '@tiptap-pro/extension-mathematics'

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import c from 'highlight.js/lib/languages/c';
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";

export default function Editor({ filePath }: { filePath: string }) {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const navigate = useNavigate();

  const lowlight = createLowlight(all);
  lowlight.register('xml', xml);
  lowlight.register('css', css);
  lowlight.register('javascript', js);
  lowlight.register('typescript', ts);
  lowlight.register('shell', bash);
  lowlight.register('cpp', cpp);
  lowlight.register('c', c);

  // 1. Load Markdown from file
  useEffect(() => {
    const loadFile = async () => {
      if (!filePath) return;
      try {
        console.log(filePath);

        const fileInfo = await stat(filePath, {
          baseDir: BaseDirectory.Document,
        });

        if (!fileInfo.isFile) {
          console.error(`${filePath} is not a file`);
          return;
        }

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
      extensions: [
        StarterKit,
        Mathematics,
        CodeBlockLowlight.configure({
          lowlight: lowlight,
        }),
        Markdown
      ],
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
    if (!filePath || !markdownContent) return;
  
    try {
      const path = `${filePath.substring(0,filePath.length - 3)}-summary.md`

      const response = await invoke<string>("generate_summary", {
        input: { content: markdownContent },
      });
  
      await writeTextFile(path, response,{
        baseDir: BaseDirectory.Document,
      });
    } catch (error) {
      console.error("Failed to read file or generate summary:", error);
    }
  }


  const generateQuiz = async () => {
    
    try {
      const tempPath = filePath.split("/").reverse()[0];
      const file = tempPath.substring(0, tempPath.length - 3);
      const quizPath = `${import.meta.env.VITE_APP_DIRECTORY}/quizzes/${file}.json`;
      const pathExits = await exists(`${import.meta.env.VITE_APP_DIRECTORY}/quizzes`, {
        baseDir: BaseDirectory.Document,
      });

      if (!pathExits) {
        await mkdir(`${import.meta.env.VITE_APP_DIRECTORY}/quizzes`, {
          baseDir: BaseDirectory.Document,
        });
      }

      const prompt = `
      Generate a multiple-choice quiz in JSON format from the following Markdown content:

      ${markdownContent}

      Format:
      {
        "quiz_title": "Your Title",
        "questions": [
          {
            "question": "Sample Question?",
            "options": ["1", "2", "3", "4"],
            "answer": 2
            "reason": "short explaination"
          }
        ]
      }`;

      const response = await invoke<string>("generate_quiz", {
        input: { prompt: prompt },
      });
      const text = response;
      const start = text.indexOf("{");
      const parsed = JSON.parse(text.slice(start));
      await writeTextFile(quizPath, JSON.stringify(parsed, null, 2), {
        baseDir: BaseDirectory.Document,
      }).catch((err) => {
        console.error("Failed to save file:", err);
      });
      navigate(`/quiz/${file}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!editor) return <p>Loading...</p>;

  return (

    <div>
       <EditorContent editor={editor}  />
       <div className="flex gap-4 items-center fixed right-10 bottom-4">
        <button
          type="button"
          disabled={!markdownContent || markdownContent == ""}
          onClick={generateQuiz}
          className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-accent/50"
        >
          <FaRegQuestionCircle className="text-accent" />
          <span className="text-text text-base">Quiz</span>
        </button>
        <button
          type="button"
          disabled={!markdownContent || markdownContent == ""}
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
