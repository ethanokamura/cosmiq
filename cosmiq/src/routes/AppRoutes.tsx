import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Quiz from "../pages/quiz/Quiz";
import Summary from "../pages/summary/Summary";
import CreateDirectory from "../pages/Create";
import Workspace from "../pages/workspaces/Workspace";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:slug" element={<Quiz />} />
      <Route path="/summary/:file" element={<Summary />} />
      <Route path="/create" element={<CreateDirectory />} />
      <Route path="/workspaces/:workspace" element={<Workspace />} />
    </Routes>
  );
};

export default AppRoutes;
