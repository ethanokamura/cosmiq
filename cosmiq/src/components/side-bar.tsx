import { useEffect, useState } from "react";
import { BaseDirectory, mkdir, exists, create } from "@tauri-apps/plugin-fs";
import { PiPlanetBold } from "react-icons/pi";
import { FaFile, FaFolder, FaPlus } from "react-icons/fa";
import { Link, redirect } from "react-router-dom";
import SubDirectory from "./sub-directory";
import { getPagesFromDir } from "@/lib/file-system";
import FileObject from "./file";

type Props = {
  dir: string;
  // directories: string[];
  currentFile: string | null;
  onSelectFile: (fileName: string | null) => void;
};

export default function SideBar({ dir, currentFile, onSelectFile }: Props) {
  const [isCreatingDir, setIsCreatingDir] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [error, setError] = useState("");
  const [path, setPath] = useState<string>("unknown");

  const [pages, setPages] = useState<string[]>();
  const [directories, setDirectories] = useState<string[]>();

  function getDirectory() {
    getPagesFromDir(dir).then(({ directories, files }) => {
      setDirectories(directories);
      setPages(files ?? []);
    });
  }

  useEffect(() => {
    if (!dir) return;
    getDirectory();
  }, [dir]);

  async function createDir(title: string) {
    if (!title.trim()) {
      setError("Filename cannot be empty.");
      return;
    }
    if (directories && directories.includes(title)) {
      setError("A file with this fileName already exists.");
      return;
    }

    try {
      const path = `${import.meta.env.VITE_APP_DIRECTORY}/${dir}/${title}`;
      if (!path || path === "") return;

      const pathExits = await exists(import.meta.env.VITE_APP_DIRECTORY!, {
        baseDir: BaseDirectory.Document,
      });

      if (!pathExits) {
        await mkdir(import.meta.env.VITE_APP_DIRECTORY!, {
          baseDir: BaseDirectory.Document,
        });
      }

      setPath(`${import.meta.env.VITE_APP_DIRECTORY!}/${path}`);

      try {
        const pathExists = await exists(path, {
          baseDir: BaseDirectory.Document,
        });
        if (pathExists) {
          /// Send some sort of message
          redirect(`/dir/${path}`);
          return;
        }
        await mkdir(path, {
          baseDir: BaseDirectory.Document,
        });
        redirect(`/dir/${path}`);
      } catch (e) {
        console.error("Error creating directory:", e);
      }
      setIsCreatingDir(false);
      setPath("unknown");
      setError("");
      getDirectory();
    } catch (err) {
      setError("Failed to create file.");
      console.error(err);
    }
  }

  async function createPage(title: string) {
    if (!title.trim()) {
      setError("Filename cannot be empty.");
      return;
    }

    if (pages && pages.includes(title)) {
      setError("A file with this fileName already exists.");
      return;
    }

    try {
      const filePath = `${import.meta.env.VITE_APP_DIRECTORY}/${dir}/${title}.md`;
      await create(filePath, {
        baseDir: BaseDirectory.Document,
      });
      setIsCreatingFile(false);
      setError("");
      onSelectFile(`${title}.md`);
      getDirectory();
    } catch (err) {
      setError("Failed to create file.");
      console.error(err);
    }
  }

  return (
    <div className="w-64 lg:w-56 px-4 h-screen card rounded-none">
      <Link to="/">
        <button type="button" className="rounded-full p-2 mb-0">
          <PiPlanetBold size={32} />
        </button>
      </Link>
      <button
        type="button"
        className="w-full my-2"
        onClick={() => setIsCreatingDir(true)}
        disabled={isCreatingFile}
      >
        <FaPlus size={14} />
        <FaFolder size={14} />
      </button>
      <button
        type="button"
        className="w-full my-2"
        onClick={() => setIsCreatingFile(true)}
        disabled={isCreatingDir}
      >
        <FaPlus size={14} />
        <FaFile size={14} />
      </button>
      <hr />
      {isCreatingDir && (
        <div className="mt-2 space-y-2">
          <input
            className="input w-full"
            type="text"
            placeholder="New file fileName"
            value={path}
            onChange={(e) => {
              setPath(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const inputName = (e.target as HTMLInputElement).value;
                createDir(inputName);
              } else if (e.key === "Escape") {
                setIsCreatingDir(false);
                setError("");
                setPath("unknown");
              }
            }}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      )}
      {isCreatingFile && (
        <div className="mt-2 space-y-2">
          <input
            className="input w-full"
            type="text"
            placeholder="New file fileName"
            onChange={(e) => {
              setPath(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const inputName = (e.target as HTMLInputElement).value;
                createPage(inputName);
              } else if (e.key === "Escape") {
                setIsCreatingFile(false);
                setError("");
                setPath("unknown");
              }
            }}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      )}
      <div>
        {directories && directories.length !== 0 ? (
          directories.map((directory) => (
            <SubDirectory
              key={directory}
              dir={`${dir}/${directory}`}
              currentFile={currentFile}
              onSelectFile={onSelectFile}
              onSetFullPath={setPath}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        {pages && pages.length !== 0 ? (
          pages.map((file) => (
            <li key={file} className="list-none">
              <FileObject
                key={file}
                file={file}
                dir={dir}
                currentFile={currentFile}
                onSelectFile={onSelectFile}
                onDelete={getDirectory}
              />
            </li>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
