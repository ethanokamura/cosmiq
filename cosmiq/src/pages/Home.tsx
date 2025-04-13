import { Link } from "react-router-dom";
import Starfield from "@/components/starfield";
import { FaPlus } from "react-icons/fa";
import Directories from "@/components/directories";
export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Starfield />
      <h1 className="text-[10em]">
        cosm<span className="text-accent font-grotesk">iq</span>
      </h1>
      <div className="flex gap-4 w-full justify-center">
        <Link to="/create">
          <button className="flex gap-4 justify-center items-center">
            <span>Create New Directory</span>
            <FaPlus />
          </button>
        </Link>
      </div>
      <Directories />
    </main>
  );
}
