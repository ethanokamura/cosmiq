import { BaseDirectory, create } from "@tauri-apps/plugin-fs";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaFolderOpen,
  FaPlus,
} from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import FileObject from "./file";
import Tooltip from "./tooltip";

type FolderProps = {
  dir: string;
  pages: string[];
  onSelectFile: (fileName: string | null) => void;
  onCreate: () => void;
  currentFile: string | null;
  onDelete: () => void;
};

export default function Folder({
  dir,
  pages,
  onSelectFile,
  onCreate,
  currentFile,
  onDelete,
}: FolderProps) {
  const [open, setOpen] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("untitled");

  async function createPage(title: string) {
    if (!title.trim()) {
      setError("Filename cannot be empty.");
      return;
    }
    if (pages.includes(title)) {
      setError("A file with this name already exists.");
      return;
    }

    try {
      const path = `${import.meta.env.VITE_APP_DIRECTORY}/${dir}/${title}.md`;
      console.log(path);
      await create(path, {
        baseDir: BaseDirectory.Document,
      });
      setIsCreating(false);
      setName("untitled");
      setError("");
      onSelectFile(`${title}.md`);
      onCreate();
    } catch (err) {
      setError("Failed to create file.");
      console.error(err);
    }
  }

  return (
    <div className="text-left w-full">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="icon-button bg-transparent text-text m-0 flex items-center gap-2 w-full"
        >
          {open ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
          {open ? <FaFolderOpen size={12} /> : <FaFolderClosed size={12} />}
          <span className="text-base">{dir.split("/").reverse()[0]}</span>
        </button>
        <Tooltip hintText={`Create a File Within ${dir.split("/").reverse()[0]}`}>
          <button
            type="submit"
            className="icon-button m-0"
            onClick={() => setIsCreating(true)}
            >
            <FaPlus size={12} />
          </button>
        </Tooltip>
      </div>
      {isCreating && (
        <div className="mt-2 space-y-2">
          <input
            className="input w-full"
            type="text"
            placeholder="New file name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const inputName = (e.target as HTMLInputElement).value;
                createPage(inputName);
              } else if (e.key === "Escape") {
                setIsCreating(false);
                setError("");
                setName("untitled");
              }
            }}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      )}
      {open && (
        <ul className="flex flex-col gap-2 border-l-2 border-text3/30 pl-2">
          {pages.map((file) => (
            <li key={file}>
              <FileObject
                key={file}
                file={file}
                dir={dir}
                currentFile={currentFile}
                onSelectFile={onSelectFile}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
