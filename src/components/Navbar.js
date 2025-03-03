import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-5 bg-gray-800 text-white flex justify-center gap-5">
      <Link to="/">Home</Link>
      <Link to="/apod">APOD</Link>
      <Link to="/mars-rover">Mars Rover</Link>
      <Link to="/epic">EPIC</Link>
      <Link to="/neo">NEO</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
};

export default Navbar;
