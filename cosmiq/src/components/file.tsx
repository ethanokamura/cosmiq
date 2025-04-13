import { BaseDirectory, remove } from "@tauri-apps/plugin-fs";
import { FaXmark } from "react-icons/fa6";
import Tooltip from "./tooltip";

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
    <div className="flex gap-2 items-center">
      <button
        className={`text-button text-sm text-left w-full truncate ${
          currentFile === file ? "bg-surface" : ""
        }`}
        onClick={() => onSelectFile(file)}
      >
        {file.replace(/\.md$/, "")}
      </button>
      <Tooltip hintText="Delete">
        <button
          type="button"
          disabled={!file}
          onClick={() => deleteFile(`${dir}/${file}`)}
          className="bg-transparent p-1 my-0 flex justify-center items-center gap-2"
        >
          <FaXmark className="text-destructive" />
        </button>
      </Tooltip>
    </div>
  );
}
