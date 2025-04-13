import { BaseDirectory, remove } from "@tauri-apps/plugin-fs";
import { FaTrash } from "react-icons/fa";

type Props = {
  dir: string;
  currentFile?: string | null;
  file: string;
  onSelectFile: (fileName: string | null) => void;
  onDelete: () => void;
};

export default function FileObject({
  dir,
  file,
  currentFile,
  onSelectFile,
  onDelete,
}: Props) {
  async function deleteFile(path: string) {
    const actualPath = `${import.meta.env.VITE_APP_DIRECTORY}/${path}`;
    await remove(actualPath, { baseDir: BaseDirectory.Document });
    onSelectFile(null);
    onDelete();
  }

  return (
    <div>
      <button
        className={`text-button text-sm text-left w-full truncate ${
          currentFile === file ? "bg-surface" : ""
        }`}
        onClick={() => onSelectFile(file)}
      >
        {file.replace(/\.md$/, "")}
      </button>
      <button
        type="button"
        disabled={!file}
        onClick={() => deleteFile(`${dir}/${file}`)}
        className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-destructive/50"
      >
        <FaTrash className="text-destructive" />
        <span className="text-destructive text-base">Delete</span>
      </button>
    </div>
  );
}
