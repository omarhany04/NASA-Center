import { useState, useEffect  } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import Quiz from "./Quiz";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [nasaMode, setNasaMode] = useState(false);
  const [manualResponses, setManualResponses] = useState({});
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const startTypingEffect = (fullText) => {
    setIsTyping(true);
    setDisplayedMessage("");
  
    let index = 0;
    const displayRef = { current: "" };
  
    const interval = setInterval(() => {
      if (index < fullText.length) {
        displayRef.current += fullText[index];
        setDisplayedMessage(displayRef.current);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setMessages(prevMessages => {
          return prevMessages.map((msg, i) => 
            i === prevMessages.length - 1 ? { ...msg, content: fullText } : msg
          );
        });
      }
    }, 15);
  };
  

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: "assistant", content: "..." }]);
      setTimeout(() => {
        startTypingEffect("Hello! I am NASA Virtual Assistant. Ask me anything about space! 🚀");
      }, 800);
    }
  }, [isOpen]);
  
  
  useEffect(() => {
    if (Object.keys(manualResponses).length === 0) {
      axios.get(process.env.PUBLIC_URL + "/data/responses.json")
        .then(response => setManualResponses(response.data))
        .catch(error => console.error("Error loading responses:", error));
    }
  }, [manualResponses]);
  
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
    setMessages([...newMessages, { role: "assistant", content: <p className="text-gray-400">Thinking...</p> }]);
    setQuery("");
  
    // Check if query exists in manual responses
    const lowerQuery = query.toLowerCase();
     if (manualResponses[lowerQuery]) {
       await new Promise(resolve => setTimeout(resolve, 1000));
       startTypingEffect(manualResponses[lowerQuery]);
       setMessages([...newMessages, { role: "assistant", content: "Final Response" }]);
       setLoading(false);
       return;
    }

    const response = await fetchNASAData(query);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    let formattedResponse = "Hmm... I couldn't find relevant data this time. Try asking something else about space!🌌 ";
  
    if (response) {
      if (Array.isArray(response.photos) && response.photos.length > 0) {
        // Mars Rover photos
        formattedResponse = "🔭 Behold! Fresh images captured by the Mars Rover. Check them out below:";
        formattedResponse = response.photos.slice(0, 5).map(photo => ({
          type: "image",
          img: photo.img_src,
          camera: `📷 Captured by: ${photo.camera.full_name}`,
          date: `📅 Date: ${photo.earth_date}`,
          rover: `🚀 Rover: ${photo.rover.name}`,
        }));
      } else if (response.url) {
        // APOD response
        formattedResponse = {
          type: "image",
          img: response.url,
          title: `🌟 NASA's Astronomy Picture of the Day: ${response.title}`,
          description: `📖 ${response.explanation}`,
        };
      } else if (Array.isArray(response) && response.length > 0) {
        // EPIC images
        formattedResponse = `🌍 Our beautiful Earth as seen from space! Here are the latest images captured by NASA’s EPIC camera:`;
        formattedResponse = response.slice(0, 5).map(item => ({
          type: "image",
          img: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replaceAll("-", "/")}/png/${item.image}.png`,
          date: `📅 Captured on: ${item.date}`,
        }));
      } else if (response.near_earth_objects) {
        // Asteroid Data
        formattedResponse = Object.values(response.near_earth_objects)
          .flat()
          .slice(0, 5)
          .map(asteroid => ({
            type: "text",
        name: `🪨 Name: ${asteroid.name}`,
        size: `📏 Estimated Size: ${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km`,
        close_approach_date: `📅 Close Approach: ${asteroid.close_approach_data[0]?.close_approach_date_full || "N/A"}`,
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
        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 fixed bottom-5 right-5"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">✨ NASA Virtual Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="h-48 overflow-y-auto border border-gray-700 rounded p-2 space-y-2">
        {messages.map((msg, index) => (
        <div key={index} className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
        {typeof msg.content === "string" ? (
        msg.role === "assistant" && isTyping && index === messages.length - 1 ? displayedMessage : msg.content
        ) : Array.isArray(msg.content) ? (
        msg.content.map((item, i) => (
          <div key={i} className="p-2 bg-gray-800 rounded-md mt-2">
            {item.type === "image" ? (
              <div>
                <img src={item.img} alt="NASA Data" className="w-full rounded-md" />
                {item.title && <p className="font-bold">{item.title}</p>}
                {item.description && <p className="text-sm">{item.description}</p>}
               </div>
              ) : (
              <p>
                <strong>{item.name}</strong> <br />
                Size: {item.size} <br />
                Close Approach: {item.close_approach_date}
              </p>
            )}
             </div>
            ))
           ) : (
           msg.content.img && (
          <div>
            <img src={msg.content.img} alt="NASA Data" className="w-full rounded-md" />
            {msg.content.title && <p className="font-bold">{msg.content.title}</p>}
            {msg.content.description && <p className="text-sm">{msg.content.description}</p>}
          </div>
        )
      )}
    </div>
  ))}
  {loading && <p className="text-gray-400">Thinking...</p>}
</div>


        {!nasaMode && (
        <div className="flex flex-col space-y-2 mt-3">
        <button onClick={() => setQuizOpen(true)} className="bg-green-500 text-white p-2 rounded-md">📝 Start Space Quiz</button>
        <button onClick={() => setNasaMode(true)} className="bg-blue-500 text-white p-2 rounded-md">💫 Ask About Space</button>
       </div>
        )}


        {nasaMode && (
          <div className="mt-3">
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              placeholder="Ask me about space..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            />
            <motion.button
              onClick={handleAsk}
              className="bg-blue-600 text-white p-2 rounded-md mt-2 w-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <Send size={20} className="mr-2" /> Send
            </motion.button>
            <button onClick={() => setNasaMode(false)} className="mt-2 text-gray-400 underline text-sm">Back</button>
          </div>
        )}
      </motion.div>
    )}

    {quizOpen && <Quiz setQuizOpen={setQuizOpen} />}
    </div>
);
};

export default Chatbot;