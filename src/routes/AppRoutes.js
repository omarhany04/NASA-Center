import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ApodPage from "../pages/ApodPage";
import MarsRoverPage from "../pages/MarsRoverPage";
import EpicPage from "../pages/EpicPage";
import NeoPage from "../pages/NeoPage";
import GalleryPage from "../pages/GalleryPage";
import SearchResults from "../pages/SearchResults";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<ApodPage />} />
        <Route path="/mars-rover" element={<MarsRoverPage />} />
        <Route path="/epic" element={<EpicPage />} />
        <Route path="/neo" element={<NeoPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
  );
};

export default AppRoutes; 
