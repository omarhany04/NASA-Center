import { useEffect, useState } from "react";
import axios from "axios";

const Neo = () => {
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then((response) => {
        const neoData = Object.values(response.data.near_earth_objects).flat();
        setAsteroids(neoData.slice(0, 5)); 
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Near-Earth Objects</h1>
      <ul className="mt-3">
        {asteroids.map((asteroid) => (
          <li key={asteroid.id} className="border p-3 mb-2 rounded-md">
            <p><strong>Name:</strong> {asteroid.name}</p>
            <p><strong>Size:</strong> {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters</p>
            <p><strong>Close Approach:</strong> {asteroid.close_approach_data[0].close_approach_date}</p>
            <p><strong>Potentially Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Neo;
