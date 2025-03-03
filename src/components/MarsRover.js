import { useEffect, useState } from "react";
import axios from "axios";

const MarsRover = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(response => setPhotos(response.data.photos.slice(0, 10))) 
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Mars Rover Photos</h1>
      <div className="grid grid-cols-2 gap-4 mt-3">
        {photos.map(photo => (
          <img key={photo.id} src={photo.img_src} alt="Mars Rover" className="rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default MarsRover;
