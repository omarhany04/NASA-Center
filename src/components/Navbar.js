import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { useState, useEffect } from "react";
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Home,
  Camera, 
  Rocket, 
  Globe, 
  Star,
  Image, 
  Video,
  Info
} from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-gradient-to-r ${theme === "dark" ? "from-gray-900 to-blue-950" : "from-blue-900 to-indigo-900"} text-white backdrop-blur-md transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Rocket className="w-5 h-5 text-blue-400" />
            <span className="hidden sm:inline-block">NASA Center</span>
          </Link>
        </div>
        
        <button
          className="md:hidden p-2 rounded-full hover:bg-blue-800/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1 items-center mr-auto ml-6">
          <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavLink to="/apod" icon={<Camera className="w-4 h-4" />} label="APOD" />
          <NavLink to="/mars-rover" icon={<Rocket className="w-4 h-4" />} label="Mars Rover" />
          <NavLink to="/epic" icon={<Globe className="w-4 h-4" />} label="EPIC" />
          <NavLink to="/neo" icon={<Star className="w-4 h-4" />} label="NEO" />
          <NavLink to="/gallery" icon={<Image className="w-4 h-4" />} label="Gallery" />
          <NavLink to="/live-earth" icon={<Video className="w-4 h-4" />} label="Live Earth" />
          <NavLink to="/about" icon={<Info className="w-4 h-4" />} label="About" />
        </div>
        
        <div className="hidden md:flex gap-3 items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search NASA Data..."
                className="px-3 py-1.5 pl-9 rounded-full text-sm bg-black/20 border border-blue-500/30 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all w-48"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button
              type="submit"
              className="ml-1 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <button
            className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${
              theme === "dark" ? "bg-blue-900" : "bg-blue-700"
            } flex items-center p-1`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div
              className={`absolute top-[2px] w-6 h-6 rounded-full transform transition-transform duration-300 flex items-center justify-center ${
                theme === "dark" 
                ? "translate-x-7 bg-indigo-800 text-gray-300" 
                : "translate-x-0 bg-yellow-400 text-yellow-800"
              }`}
            >
              {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-2 bg-blue-950/80 border-t border-blue-800/50 animate-fadeIn">
          <MobileNavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/apod" icon={<Camera className="w-4 h-4" />} label="APOD" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/mars-rover" icon={<Rocket className="w-4 h-4" />} label="Mars Rover" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/epic" icon={<Globe className="w-4 h-4" />} label="EPIC" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/neo" icon={<Star className="w-4 h-4" />} label="NEO" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/gallery" icon={<Image className="w-4 h-4" />} label="Gallery" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/live-earth" icon={<Video className="w-4 h-4" />} label="Live Earth" onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/about" icon={<Info className="w-4 h-4" />} label="About" onClick={() => setIsOpen(false)} />

          <div className="border-t border-blue-800/50 pt-3 mt-1">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search NASA Data..."
                  className="w-full px-3 py-2 pl-9 rounded-full text-sm bg-black/20 border border-blue-500/30 focus:border-blue-400 focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button
                type="submit"
                className="ml-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-300">Change Theme</span>
              <button
                className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-blue-900" : "bg-blue-700"
                } flex items-center p-1`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <div
                  className={`absolute top-[2px] w-6 h-6 rounded-full transform transition-transform duration-300 flex items-center justify-center ${
                    theme === "dark" 
                    ? "translate-x-7 bg-indigo-800 text-gray-300" 
                    : "translate-x-0 bg-yellow-400 text-yellow-800"
                  }`}
                >
                  {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, icon, label }) => {
  return (
    <Link 
      to={to} 
      className="px-3 py-2 rounded-full hover:bg-blue-700/30 transition-colors flex items-center gap-1.5 text-sm font-medium"
    >
      {icon}
      {label}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, icon, label, onClick }) => {
  return (
    <Link 
      to={to} 
      className="px-3 py-2.5 rounded-md hover:bg-blue-800/50 transition-colors flex items-center gap-3"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default Navbar;