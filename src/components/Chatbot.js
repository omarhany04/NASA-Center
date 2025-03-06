import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

  const fetchNASAData = async (query) => {
    let url = "";

    if (query.toLowerCase().includes("apod")) {
      url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    } else if (query.toLowerCase().includes("mars")) {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`;
    } else if (query.toLowerCase().includes("earth") || query.toLowerCase().includes("epic")) {
      url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`;
    } else if (query.toLowerCase().includes("asteroid") || query.toLowerCase().includes("neo")) {
      url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;
    } else {
      return "Sorry, I can only fetch data for APOD, Mars, EPIC, and NEO.";
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("NASA API Error:", error);
      return "Error fetching data. Please try again.";
    }
    finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
  
    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setQuery("");
  
    const response = await fetchNASAData(query);
  
    let formattedResponse = "Sorry, I couldn't find relevant data.";
  
    if (response) {
      if (Array.isArray(response.photos) && response.photos.length > 0) {
        // Format Mars Rover images
        formattedResponse = response.photos.slice(0, 5).map(photo => ({
          img: photo.img_src,
          camera: photo.camera.full_name,
          date: photo.earth_date,
          rover: photo.rover.name,
        }));
      } else if (response.url) {
        // Format APOD response
        formattedResponse = {
          img: response.url,
          title: response.title,
          description: response.explanation,
        };
      } else if (Array.isArray(response) && response.length > 0) {
        // Format EPIC images
        formattedResponse = response.slice(0, 5).map(item => ({
          img: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replaceAll("-", "/")}/png/${item.image}.png`,
          date: item.date,
        }));
      } else if (response.near_earth_objects) {
        // Format NEO (Asteroid) data
        formattedResponse = Object.values(response.near_earth_objects)
          .flat()
          .slice(0, 5)
          .map(asteroid => ({
            name: asteroid.name,
            size: `${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km`,
            close_approach_date: asteroid.close_approach_data[0]?.close_approach_date_full || "N/A",
          }));
      }
    }
  
    setMessages([...newMessages, { role: "assistant", content: formattedResponse }]);
    setLoading(false);
  };
  

  return (
    <div className="fixed bottom-5 right-5">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-80 fixed bottom-5 right-5"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">🚀 NASA AI Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="h-48 overflow-y-auto border border-gray-700 rounded p-2 space-y-2">
            {messages.map((msg, index) => (
              <div className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-700 text-white"}`}>
              {typeof msg.content === "string" ? (
                msg.content
              ) : (
                msg.content.map((item, index) => (
                  <div className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-700 text-white"}`}>
  {typeof msg.content === "string" ? (
    msg.content
  ) : Array.isArray(msg.content) ? (
    msg.content.map((item, index) => (
      <div key={index} className="mb-2">
        {item.img && <img src={item.img} alt="NASA Data" className="w-full h-auto rounded-md" />}
        {item.title && <h4 className="text-lg font-bold">{item.title}</h4>}
        {item.description && <p className="text-sm">{item.description}</p>}
        {item.camera && <p className="text-sm">📷 {item.camera}</p>}
        {item.date && <p className="text-sm">🗓️ {item.date}</p>}
        {item.rover && <p className="text-sm">🚀 Rover: {item.rover}</p>}
        {item.name && <p className="text-sm">🌍 Asteroid: {item.name}</p>}
        {item.size && <p className="text-sm">📏 Size: {item.size}</p>}
        {item.close_approach_date && <p className="text-sm">🗓️ Close Approach: {item.close_approach_date}</p>}
      </div>
    ))
  ) : (
    "No data available."
  )}
</div>

                ))
              )}
            </div>
            
            ))}
            {loading && <p className="text-gray-400">Thinking...</p>}
          </div>
          <div className="flex mt-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about NASA data..."
              className="flex-1 p-2 rounded-md text-black"
            />
            <button
              onClick={handleAsk}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;


