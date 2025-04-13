import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "../../components/editor";
import SideBar from "@/components/side-bar";

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
    <div className="flex">
      <SideBar
        dir={workspace}
        currentFile={selectedFile}
        onSelectFile={setSelectedFile}
      />
      <main className="pt-14 overflow-y-scroll h-screen">
        {selectedFile ? ( 
          <Editor filePath={fullPath} />
        ) : (
          <div className="card mx-auto">
            <h1>No file selected</h1>
            <p>Pick a file to start editing</p>
          </div>
        )}
      </main>
    </div>
  );
}
