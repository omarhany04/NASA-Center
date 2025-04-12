import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
        <Link to="/" className="block md:hidden">
        NASA Center
        </Link>

        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center font-bold mr-auto">
          <Link to="/">Home</Link>
          <Link to="/apod">APOD</Link>
          <Link to="/mars-rover">Mars Rover</Link>
          <Link to="/epic">EPIC</Link>
          <Link to="/neo">NEO</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/live-earth">Live Earth</Link>
          <Link to="/about">About NASA</Link>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <form onSubmit={handleSearch} className="flex items-center ml-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NASA Data..."
              className="px-3 py-1 rounded-md text-black"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-blue-500 rounded-md"
            >
              🔍
            </button>
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-3">
          <Link to="/apod" onClick={() => setIsOpen(false)}>APOD</Link>
          <Link to="/mars-rover" onClick={() => setIsOpen(false)}>Mars Rover</Link>
          <Link to="/epic" onClick={() => setIsOpen(false)}>EPIC</Link>
          <Link to="/neo" onClick={() => setIsOpen(false)}>NEO</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/live-earth" onClick={() => setIsOpen(false)}>Live Earth</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About NASA</Link>

          <form onSubmit={handleSearch} className="flex items-center mt-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NASA Data..."
              className="px-3 py-1 rounded-md text-black flex-1"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-blue-500 rounded-md"
            >
              🔍
            </button>
          </form>

          <button
            className={`mt-3 w-12 h-6 flex items-center bg-gray-700 rounded-full p-1 transition-all duration-300 ${
              theme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={toggleTheme}
          >
            <div className="w-5 h-5 bg-white rounded-full flex justify-center items-center">
              {theme === "dark" ? "🌙" : "🌞"}
            </div>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
