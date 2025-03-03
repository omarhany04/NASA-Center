import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <AppRoutes />
    </div>
    </Router>
  );
}

export default App;
