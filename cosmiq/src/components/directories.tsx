import { useEffect, useState } from "react";
import { mkdir, readDir } from "@tauri-apps/plugin-fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { exists, BaseDirectory } from "@tauri-apps/plugin-fs";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDirs = async () => {
      try {
        console.log("Fetching directories...");
        const dirs = await getDirectoryNames();
        console.log("Got dirs:", dirs);
        setSubdirs(dirs);
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
    <div>
      {subdirs.map((dir) => (
        <Link to={`/workspaces/${dir}`}>
          <div className="card" key={dir}>
            {dir}
          </div>
        </Link>
      ))}
    </div>
  );
}
