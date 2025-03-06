import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="p-5 bg-gray-800 text-white flex justify-between items-center">
      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/apod">APOD</Link>
        <Link to="/mars-rover">Mars Rover</Link>
        <Link to="/epic">EPIC</Link>
        <Link to="/neo">NEO</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search NASA Data..."
          className="px-3 py-1 rounded-md text-black"
        />
        <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 rounded-md">Search🔍</button>
      </form>
      <button 
        className={`ml-4 w-12 h-6 flex items-center bg-gray-700 rounded-full p-1 transition-all duration-300 ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
        onClick={toggleTheme}
      >
        <div className="w-5 h-5 bg-white rounded-full flex justify-center items-center">
          {theme === "dark" ? "🌙" : "🌞"}
        </div>
      </button>
    </nav>
  );
};

export default Navbar;
