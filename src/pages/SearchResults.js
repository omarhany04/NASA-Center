import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.REACT_APP_NASA_API_KEY;
        const endpoints = [
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`,
          `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`,
          `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`
        ];

        const responses = await Promise.allSettled(endpoints.map(url => axios.get(url)));

        const successfulResponses = responses
          .filter(res => res.status === "fulfilled")
          .map(res => res.value.data);

        if (successfulResponses.length === 0) {
          throw new Error("No valid responses from NASA APIs.");
        }

        const extractedResults = [];
        successfulResponses.forEach(data => {
          if (data.url) {
            extractedResults.push({
              title: data.title,
              imageUrl: data.url,
              description: data.explanation
            });
          } else if (data.photos) {
            data.photos.forEach(photo => {
              extractedResults.push({
                title: `Mars Rover Photo - ${photo.rover.name}`,
                imageUrl: photo.img_src,
                description: `Taken by ${photo.camera.full_name} on ${photo.earth_date}`
              });
            });
          } else if (data.near_earth_objects) {
            Object.values(data.near_earth_objects).flat().forEach(neo => {
              extractedResults.push({
                title: neo.name,
                description: `Potentially hazardous: ${neo.is_potentially_hazardous_asteroid}`,
              });
            });
          } else if (Array.isArray(data)) {
            data.forEach(item => {
              const date = item.date.split(" ")[0].replaceAll("-", "/");
              extractedResults.push({
                title: "EPIC Earth Image",
                imageUrl: `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${item.image}.png`,
                description: `Captured on ${item.date}`
              });
            });
          }
        });

        const filteredResults = extractedResults.filter(item =>
          JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
      } catch (err) {
        console.error("Error fetching search data:", err);
        setError("NASA API is currently unavailable. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item, index) => (
            <div key={index} className="border p-3 rounded-md shadow-lg">
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-md" />}
              <h2 className="font-bold mt-2">{item.title}</h2>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
