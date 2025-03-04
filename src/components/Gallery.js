import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const imagesPerPage = 10;

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?count=97&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(response => setImages(response.data))
      .catch(error => console.error(error));
  }, []);

  const filteredImages = images.filter(image => {
    if (!startDate || !endDate) return true;
    const imageDate = new Date(image.date);
    return imageDate >= new Date(startDate) && imageDate <= new Date(endDate);
  });

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">NASA Image Gallery</h1>
      
      <div className="flex justify-center space-x-4 mb-5">
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded-md"
        />
      </div>

      {filteredImages.length === 0 ? (
        <p className="text-center text-red-500">No images found for the selected date range.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((image, index) => (
              <div key={index} className="rounded-md overflow-hidden shadow-lg">
                <img src={image.url} alt={image.title} className="w-full h-40 object-cover" />
                <p className="text-center p-2">{image.title}</p>
                <p className="text-center text-sm text-gray-500">{image.date}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-5 space-x-2">
            <button 
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button 
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;