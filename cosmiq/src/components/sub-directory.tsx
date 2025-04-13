import { useEffect, useState } from "react";
import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs";
import { redirect } from "react-router-dom";
import Folder from "./folder";

type Props = {
  dir: string;
  currentFile: string | null;
  onSelectFile: (fileName: string | null) => void;
  onSetFullPath: (path: string) => void;
};

export default function SubDirectory({
  dir,
  currentFile,
  onSelectFile,
  onSetFullPath,
}: Props) {
  const [pages, setPages] = useState<string[]>([]);
  function getPages() {
    const path = `${import.meta.env.VITE_APP_DIRECTORY}/${dir}`;

    readDir(path, { baseDir: BaseDirectory.Document })
      .then((entries) => {
        setPages(
          entries
            .map((entry) => entry.name)
            .filter(
              (entry) =>
                entry.substring(entry.length - 3, entry.length) == ".md",
            )
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
        );
      })
      .catch((err) => {
        console.error("Failed to read directory:", err);
      });
  }

  useEffect(() => {
    if (!dir) redirect("/");
    getPages();
  }, [dir]);

  useEffect(() => {
    if (!currentFile || !dir) return;
    onSetFullPath(
      `${import.meta.env.VITE_APP_DIRECTORY}/${dir}/${currentFile}`,
    );
    getPages();
  }, [currentFile, dir]);

  return (
    <Folder
      key={dir}
      dir={dir}
      pages={pages}
      onCreate={() => getPages}
      onSelectFile={onSelectFile}
      currentFile={currentFile}
      onDelete={getPages}
    />
  );
}
