import { mkdir, BaseDirectory, exists } from "@tauri-apps/plugin-fs";
import { useState } from "react";
import Starfield from "@/components/starfield";
import { Link, redirect } from "react-router-dom";

export default function CreateDirectory() {
  const [path, setPath] = useState<string>("");

  async function createClass(e: React.FormEvent) {
    e.preventDefault();

    const appPath = import.meta.env.VITE_APP_DIRECTORY!;

    console.log(appPath);

    if (!path || path === "") return;

    const pathExits = await exists(appPath, {
      baseDir: BaseDirectory.Document,
    });

    if (!pathExits) {
      await mkdir(appPath, {
        baseDir: BaseDirectory.Document,
      });
      console.log(`directory path @ ${appPath}`);
    }

    const newPath = `${appPath!}/${path}`;

    try {
      const pathExists = await exists(newPath, {
        baseDir: BaseDirectory.Document,
      });
      if (pathExists) {
        /// Send some sort of message
        redirect(`/workspaces/${newPath}`);
        return;
      }
      await mkdir(newPath, {
        baseDir: BaseDirectory.Document,
      });
      console.log(`created new newPath @ ${newPath}`);
      redirect(`/workspaces/${newPath}`);
    } catch (e) {
      console.error("Error creating directory:", e);
    }
  }

  return (
    <main className="flex flex-col items-center">
      <Starfield />
      <div className="card">
        <h1>Create a New Directory</h1>
        <form onSubmit={createClass} className="flex gap-4 items-center">
          <input
            id="cname"
            name="cname"
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value.trim())}
            className="h-fit"
          />
          <button type="submit" disabled={path === "" || path == null}>
            Create
          </button>
        </form>
      </div>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </main>
  );
}
