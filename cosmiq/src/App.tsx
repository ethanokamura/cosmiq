import { useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
// import Sidebar from "./components/sidebar/sidebar";
// import { useLocation } from 'react-router-dom';
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';

function App() {
  const location = useLocation();
  const mainWindow = getCurrentWindow();

  useEffect(() => {
    async function setHomePageSize() {
      if (location.pathname === '/') {
        console.log("true");
        await mainWindow.setSize(new LogicalSize(900, 600));
        await mainWindow.setResizable(false);
      } else {
        // Reset resizability for other pages (optional)
        await mainWindow.setResizable(true);
        // You might also want to set a default size for other pages if needed
        // const defaultLogicalSize = { width: yourDefaultWidth, height: yourDefaultHeight };
        // const defaultPhysicalSize = mainWindow.logicalToPhysical(defaultLogicalSize, factor);
        // await mainWindow.setSize(defaultPhysicalSize);
      }
    }

    setHomePageSize();
  }, [location, mainWindow]);

  // const location = useLocation();
  // const currentRoute = location.pathname;
  return <AppRoutes />;
}

export default App;
