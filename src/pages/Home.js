import { Link } from "react-router-dom";
import SolarSystem from "../components/SolarSystem";

const Home = () => {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold mb-6">🚀 Welcome to NASA Center</h1>
      <p className="text-lg mb-4">
        Explore fascinating space data from NASA’s APIs.
      </p>

      <SolarSystem />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Link
          to="/apod"
          className="bg-violet-700 text-white p-4 rounded-lg shadow-md hover:bg-violet-800"

        >
          🌌 Astronomy Picture of the Day (APOD)
        </Link>

        <Link
          to="/mars-rover"
          className="bg-red-600 text-white p-4 rounded-lg shadow-md hover:bg-red-700"
        >
          🔴 Mars Rover Photos
        </Link>

        <Link
          to="/epic"
          className="bg-teal-600 text-white p-4 rounded-lg shadow-md hover:bg-teal-700"
        >
          🌍 Earth (EPIC)
        </Link>

        <Link
          to="/neo"
          className="bg-yellow-500 text-black p-4 rounded-lg shadow-md hover:bg-yellow-600"
        >
          ☄️ Near-Earth Objects (NEO)
        </Link>

        <Link
          to="/gallery"
          className="bg-orange-600 text-white p-4 rounded-lg shadow-md hover:bg-orange-700"

        >
          📸 NASA Gallery 
        </Link>

        <Link
          to="/live-earth"
          className="bg-indigo-800 text-white p-4 rounded-lg shadow-md hover:bg-indigo-900"
        >
          📡 Live Earth Stream
        </Link>
      </div>
    </div>
  );
};

export default Home;
