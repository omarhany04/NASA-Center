import { useEffect, useState } from "react";
import axios from "axios";

const Apod = () => {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(response => setApod(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-5">
      {apod ? (
        <div>
          <h1 className="text-2xl font-bold">{apod.title}</h1>
          <p className="text-sm">{apod.date}</p>
          <img src={apod.url} alt={apod.title} className="w-full mt-3 rounded-md" />
          <p className="mt-3">{apod.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Apod;
