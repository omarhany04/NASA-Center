import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
    <Router>
    <div className="min-h-screen bg-gray-900 text-white dark:bg-black dark:text-white">
      <Navbar />
      <AppRoutes />
    </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
