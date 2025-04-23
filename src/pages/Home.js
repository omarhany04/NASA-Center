import { Link } from "react-router-dom";
import SolarSystem from "../components/SolarSystem";
import Ticker from "../components/Ticker";

const Home = () => {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold mb-6">🚀 Welcome to NASA Center</h1>
      
      <Ticker />

      <SolarSystem />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
        {/* First row - APOD & Mars Rover */}
        <Link
          to="/apod"
          className="group relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white py-4 px-6 rounded-lg shadow-md hover:shadow-indigo-500/50 hover:shadow-lg transition-all duration-500 ease-out border border-indigo-800/20 hover:scale-105 hover:-translate-y-1 hover:z-10"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-indigo-500/40 to-indigo-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-medium tracking-wide">Astronomy Picture of the Day</span>
            <span className="bg-blue-800/40 p-1.5 rounded-full flex items-center justify-center group-hover:bg-blue-600/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-lg">🌌</span>
            </span>
          </div>
        </Link>

        <Link
          to="/mars-rover"
          className="group relative overflow-hidden bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white py-4 px-6 rounded-lg shadow-md hover:shadow-red-500/50 hover:shadow-lg transition-all duration-500 ease-out border border-red-800/20 hover:scale-105 hover:-translate-y-1 hover:z-10"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 via-red-500/40 to-red-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-medium tracking-wide">Mars Rover Photos</span>
            <span className="bg-red-900/40 p-1.5 rounded-full flex items-center justify-center group-hover:bg-red-600/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-lg">🔴</span>
            </span>
          </div>
        </Link>

        {/* Second row - Earth & NEO */}
        <Link
          to="/epic"
          className="group relative overflow-hidden bg-gradient-to-r from-blue-900 via-teal-800 to-cyan-900 text-white py-4 px-6 rounded-lg shadow-md hover:shadow-teal-500/50 hover:shadow-lg transition-all duration-500 ease-out border border-teal-800/20 hover:scale-105 hover:-translate-y-1 hover:z-10"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 via-teal-500/40 to-teal-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-teal-700 to-cyan-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-medium tracking-wide">Earth (EPIC)</span>
            <span className="bg-teal-900/40 p-1.5 rounded-full flex items-center justify-center group-hover:bg-teal-600/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-lg">🌍</span>
            </span>
          </div>
        </Link>

        <Link
          to="/neo"
          className="group relative overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-4 px-6 rounded-lg shadow-md hover:shadow-amber-500/50 hover:shadow-lg transition-all duration-500 ease-out border border-amber-800/20 hover:scale-105 hover:-translate-y-1 hover:z-10"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-amber-500/40 to-amber-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-medium tracking-wide">Near-Earth Objects (NEO)</span>
            <span className="bg-amber-900/40 p-1.5 rounded-full flex items-center justify-center group-hover:bg-amber-600/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-lg">☄️</span>
            </span>
          </div>
        </Link>

        {/* Third row - Gallery & Live Stream - Unique colors */}
        <Link
          to="/gallery"
          className="group relative overflow-hidden bg-gradient-to-r from-fuchsia-900 via-pink-800 to-rose-800 text-white py-4 px-6 rounded-lg shadow-md hover:shadow-pink-500/50 hover:shadow-lg transition-all duration-500 ease-out border border-pink-800/20 hover:scale-105 hover:-translate-y-1 hover:z-10"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/10 via-pink-500/40 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-800 via-pink-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-medium tracking-wide">NASA Gallery</span>
            <span className="bg-fuchsia-800/40 p-1.5 rounded-full flex items-center justify-center group-hover:bg-fuchsia-600/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-lg">📸</span>
            </span>
          </div>
        </Link>

        <Link
          to="/live-earth"
          className="group relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-violet-900 text-white py-4 px-6 rounded-lg shadow-md hover:shadow-purple-500/50 hover:shadow-lg transition-all duration-500 ease-out border border-purple-800/20 hover:scale-105 hover:-translate-y-1 hover:z-10"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-purple-500/40 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 via-purple-700 to-violet-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-medium tracking-wide">Live Earth Stream</span>
            <span className="bg-purple-800/40 p-1.5 rounded-full flex items-center justify-center group-hover:bg-purple-600/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-lg">📡</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
