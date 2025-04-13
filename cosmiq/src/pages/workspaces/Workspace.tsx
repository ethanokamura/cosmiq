import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "../../components/editor";
import { Link } from "react-router-dom";
import { FaRegQuestionCircle, FaRegFileAlt } from "react-icons/fa";
import SideBar from "@/components/side-bar";

export default function Workspace() {
  const { workspace } = useParams();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fullPath, setFullPath] = useState<string>("");

  // at the top
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
      `${import.meta.env.VITE_APP_DIRECTORY}/${workspace}/${selectedFile}`,
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
      {/* directories={directories}  */}
      <main className="pt-14">
        {selectedFile ? (
          <div>
            <div className="flex gap-4 items-center fixed right-10 top-4">
              <Link to="/quiz">
                <button
                  type="button"
                  className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-accent/50"
                >
                  <FaRegQuestionCircle className="text-accent" />
                  <span className="text-text text-base">Quiz</span>
                </button>
              </Link>
              <Link to="/summary">
                <button
                  type="button"
                  className="bg-background w-full flex justify-center items-center gap-2 ring-1 ring-accent/50"
                >
                  <FaRegFileAlt className="text-accent" />
                  <span className="text-text text-base">Summary</span>
                </button>
              </Link>
            </div>
            <h1 className="text-4xl">
              {selectedFile.substring(0, selectedFile.length - 3)}
            </h1>
            <Editor filePath={fullPath} />
          </div>
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
