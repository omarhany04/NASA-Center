import { useEffect, useState } from "react";
import axios from "axios";

const Epic = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then((response) => setImages(response.data.slice(0, 5)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Earth Images from EPIC</h1>
      <div className="grid grid-cols-2 gap-4 mt-3">
        {images.map((image) => (
          <img
            key={image.identifier}
            src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date.split(" ")[0].replaceAll("-", "/")}/png/${image.image}.png`}
            alt="EPIC Earth Image"
            className="rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Epic;
