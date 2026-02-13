import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="fixed z-10 w-128 top-10 inset-shadow-sm drop-shadow-2xl left-1/2 translate-x-[-50%] flex items-center justify-between p-2 rounded-full bg-gradient-to-br from-background-2 to-background text-text">
      <Link className="bg-surface rounded-full px-4 py-2 shadow-xl" to="/">
        Home
      </Link>
      <ul className="flex gap-5">
        <li>
          <Link to="/corky/">Demo</Link>
        </li>
        <li>
          <Link to="/blog/">Docs</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
      </ul>
      <Link className="bg-accent text-background rounded-full px-4 py-2 shadow-xl" to="/">
        Download
      </Link>
    </nav>
  );
}