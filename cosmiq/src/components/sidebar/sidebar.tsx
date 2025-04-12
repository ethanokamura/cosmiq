import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <nav className="w-48 h-screen card">
      <h1 className="text-3xl text-accent text-center">
        <Link to="/">cosmiq</Link>
      </h1>
      <div className="flex gap-4">
        <Link to="/quiz">Quiz</Link>
        <Link to="/summary">Summary</Link>
      </div>
      <hr/>
      <div className="dir">
        <h2 className="text-2xl">dir</h2>
        <div className="pl-2">
          <ul className="pl-2">
            <li>file1.md</li>
            <li>file1.md</li>
            <li>file1.md</li>
            <li>file1.md</li>
          </ul>
        </div>
      </div>
    </nav>

  );
}