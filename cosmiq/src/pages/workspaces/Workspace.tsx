import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "../../components/editor";
import SideBar from "@/components/side-bar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Starfield from "@/components/starfield";

export default function Workspace() {
  const { workspace } = useParams();
  
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fullPath, setFullPath] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  
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
      <div className="flex relative">
        { open && (
          <SideBar
          dir={workspace}
          currentFile={selectedFile}
          onSelectFile={setSelectedFile}
          />
        )}
        <button
          className={`absolute -right-10 top-0 icon-button bg-transparent text-accent z-10 transition-all ease-linear duration-100`}
          onClick={() => setOpen(!open)}
          >
          { open ?
            <FaAngleDoubleLeft size={24}/>
          :  
            <FaAngleDoubleRight size={24}/>
          }
        </button>
      </div>
      <main className="pt-14 overflow-y-scroll h-screen">
        {selectedFile ? ( 
          <Editor filePath={fullPath} />
        ) : (
          <>
            <Starfield/>
            <div className="card mx-auto">
              <h1>No file selected</h1>
              <p>Pick a file to start editing</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
