import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/sidebar/sidebar";
import Starfield from "./components/stars/starfield";

function App() {

  return (
    <div className="flex">
      <Starfield/>
      <Sidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
