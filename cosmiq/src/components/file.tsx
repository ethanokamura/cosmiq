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

  console.log(`current file ${currentFile}`);
  console.log(`this file ${file}`);
  // console.log(file);

  return (
    <div className="flex gap-2 items-center w-full max-w-full">
      <button
        className={`text-button text-sm text-left w-44 ${
          currentFile == `${dir}/${file}` ? "bg-surface" : "bg-background/50"
        }`}
        onClick={() => onSelectFile(`${dir}/${file}`)}
      >
        <span className="text-ellipsis">
          {file.replace(/\.md$/, "")} 
        </span>
      </button>
      <Tooltip hintText="Delete">
        <button
          type="button"
          disabled={!file}
          onClick={() => deleteFile(`${dir}/${file}`)}
          className="bg-transparent shrink-0 p-1 my-0 flex justify-center items-center"
        >
          <FaXmark className="text-destructive" />
        </button>
      </Tooltip>
    </div>
  );
}
