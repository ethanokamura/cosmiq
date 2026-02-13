import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextEditor from "../../components/editor";
import SideBar from "@/components/side-bar";
import Starfield from "@/components/starfield";

export default function Workspace() {
  const { workspace } = useParams();
  
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fullPath, setFullPath] = useState<string>("");

  
  const navigate = useNavigate();

  useEffect(() => {
    if (!workspace) {
      navigate("/");
      return;
    }
    // loadDirs();
  }, [workspace, navigate]);

  useEffect(() => {
    if (!selectedFile || !workspace) return;
    setFullPath(
      `${import.meta.env.VITE_APP_DIRECTORY}/${selectedFile}`,
    );
    // loadDirs();
  }, [selectedFile, workspace]);

  if (!workspace) return null;

  return (
    <div className="flex relative">
      <SideBar
        dir={workspace}
        currentFile={selectedFile}
        onSelectFile={setSelectedFile}
      />
      <main className="h-screen p-0 overflow-hidden">
        {selectedFile ? ( 
          <TextEditor filePath={fullPath} />
        ) : (
          <>
            <Starfield/>
            <div className="card mx-auto mt-40">
              <h1>No file selected</h1>
              <p>Pick a file to start editing</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
