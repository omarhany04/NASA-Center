import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold mb-6">🚀 Welcome to NASA Explorer</h1>
      <p className="text-lg mb-4">
        Explore fascinating space data from NASA’s APIs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Link
          to="/apod"
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700"
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
          className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700"
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
          to="/search"
          className="bg-gray-700 text-white p-4 rounded-lg shadow-md hover:bg-gray-800"
        >
          🔍 Search NASA Data
        </Link>
      </div>
    </div>
  );
};

export default Home;
