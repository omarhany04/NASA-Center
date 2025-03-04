import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [source, setSource] = useState("all"); // Filter by source
  const [date, setDate] = useState(""); // Filter by date

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apodRes = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const marsRes = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const epicRes = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        
        const apodImages = [{ url: apodRes.data.url, source: "APOD", date: apodRes.data.date }];
        const marsImages = marsRes.data.photos.slice(0, 10).map(photo => ({ url: photo.img_src, source: "Mars Rover", date: photo.earth_date }));
        const epicImages = epicRes.data.slice(0, 10).map(image => ({ 
          url: `https://epic.gsfc.nasa.gov/archive/natural/${image.date.split(" ")[0].replaceAll("-", "/")}/png/${image.image}.png`, 
          source: "EPIC", 
          date: image.date.split(" ")[0]
        }));
        
        const allImages = [...apodImages, ...marsImages, ...epicImages];
        setImages(allImages);
        setFilteredImages(allImages);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    let filtered = images;
    if (source !== "all") {
      filtered = filtered.filter(img => img.source === source);
    }
    if (date) {
      filtered = filtered.filter(img => img.date === date);
    }
    setFilteredImages(filtered);
  }, [source, date, images]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">NASA Image Gallery</h1>
      <div className="flex gap-4 mb-4">
        <select value={source} onChange={(e) => setSource(e.target.value)} className="p-2 border rounded-md">
          <option value="all">All Sources</option>
          <option value="APOD">Astronomy Picture of the Day</option>
          <option value="Mars Rover">Mars Rover</option>
          <option value="EPIC">EPIC Earth Images</option>
        </select>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="p-2 border rounded-md" 
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredImages.map((img, index) => (
          <img key={index} src={img.url} alt="NASA Image" className="rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
