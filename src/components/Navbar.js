import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="p-5 bg-gray-800 text-white flex justify-center gap-5">
      <Link to="/">Home</Link>
      <Link to="/apod">APOD</Link>
      <Link to="/mars-rover">Mars Rover</Link>
      <Link to="/epic">EPIC</Link>
      <Link to="/neo">NEO</Link>
      <Link to="/search">Search</Link>
      <button 
          className={`ml-4 w-12 h-6 flex items-center bg-gray-700 rounded-full p-1 transition-all duration-300 ${
            theme === "dark" ? "justify-end" : "justify-start"
          }`}
          onClick={toggleTheme}>
          <div className="w-5 h-5 bg-white rounded-full flex justify-center items-center">
            {theme === "dark" ? "🌞" : "🌙"}
          </div>
        </button>
    </nav>
  );
};

export default Navbar;

