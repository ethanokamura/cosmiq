import { useEffect, useState } from "react";
import { mkdir, readDir } from "@tauri-apps/plugin-fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { exists, BaseDirectory } from "@tauri-apps/plugin-fs";
import { Link } from "react-router-dom";
import Tooltip from "./tooltip";
import { FaPlus } from "react-icons/fa";

async function getDirectoryNames(): Promise<string[]> {
  const appPath = import.meta.env.VITE_APP_DIRECTORY!;
  const pathExits = await exists(appPath, {
    baseDir: BaseDirectory.Document,
  });

  if (!pathExits) {
    await mkdir(appPath, {
      baseDir: BaseDirectory.Document,
    });
  }

  const baseDir = await documentDir();
  console.log("Base dir:", baseDir);

  const newPath = await join(baseDir, appPath);

  const entries = await readDir(newPath);
  console.log("Entries:", entries);

  const subdirs: string[] = [];

  for (const entry of entries) {
    if (!entry.name) continue;

    const fullPath = await join(newPath, entry.name);
    console.log("Checking:", fullPath);

    try {
      await readDir(fullPath);
      subdirs.push(entry.name);
    } catch {
      console.log("Not a dir:", fullPath);
    }
  }

  return subdirs;
}

export default function Directories() {
  const [subdirs, setSubdirs] = useState<string[]>([]);
  const [absPath, setAbsPath] = useState<string>(".");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDirs = async () => {
      try {
        const path = await documentDir();
        setAbsPath(path);
        console.log("Fetching directories...");
        const dirs = await getDirectoryNames();
        const updated = dirs.filter(dir => dir !== "quizzes");
        setSubdirs(updated);
      } catch (err) {
        console.error("Error loading subdirs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDirs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card flex flex-col gap-5 items-center rounded-none h-screen w-96 overflow-hidden text-start z-10">
      <div className="flex items-center justify-between w-full border-b-2 border-surface">
        <h1>Create</h1>
        <Link to="/create" className="">
          <Tooltip hintText="Create a Directory">
            <button className="bg-transparent p-0 m-0 text-accent">
              <FaPlus />
            </button>
          </Tooltip>
        </Link>
      </div>
      <ul className="w-full flex flex-col gap-2 overflow-y-scroll">
        {subdirs.map((dir) => (
          <li key={dir} className="border-1 border-surface rounded">
            <Link to={`/workspaces/${dir}`}>
              <button className="hover:bg-background/90 bg-background/70 rounded px-4 py-2 text-start w-full my-0 hover:scale-100 hover:border-2 border-accent">
                <h1 className="my-2 text-lg md:text-xl font-medium text-text">{dir}</h1>
                <p className="text-xs md:text-sm break-words font-medium text-text3">{`${absPath}/${import.meta.env.VITE_APP_DIRECTORY}/${dir}`}</p>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
