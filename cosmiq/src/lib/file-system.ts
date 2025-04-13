// src/lib/fsHelpers.ts
import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs";

export type FsResult = {
  directories: string[];
  files: string[];
};

export async function getPagesFromDir(dir: string): Promise<FsResult> {
  const fullPath = `${import.meta.env.VITE_APP_DIRECTORY}/${dir}`;

  try {
    const entries = await readDir(fullPath, {
      baseDir: BaseDirectory.Document,
    });

    const directories: string[] = [];
    const files: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory) {
        directories.push(entry.name ?? "");
      } else if (entry.isFile && entry.name?.endsWith(".md")) {
        files.push(entry.name);
      }
    }

    return {
      directories: directories.sort((a, b) => a.localeCompare(b)),
      files: files.sort((a, b) => a.localeCompare(b)),
    };
  } catch (err) {
    console.error("Error reading directory:", err);
    return { directories: [], files: [] };
  }
}
