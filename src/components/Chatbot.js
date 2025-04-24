import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageSquare, X, Send, StopCircle } from "lucide-react";
import Quiz from "./Quiz";
import { Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [nasaMode, setNasaMode] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);
  const fullMessageRef = useRef("");
  
  // Initialize Gemini API client
  const initializeGemini = async () => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro", 
      requestOptions: {
        apiVersion: "v1",   
      },
    });
    return model;
  };
  
  // Ask Gemini for a response
  const askGemini = async (userQuery) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }]
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Gemini API Error:", data.error);
        return data.error?.message || "Gemini API call failed.";
      }
  
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "There was a problem connecting to the Gemini API.";
    }
  };
  
  // Stop typing effect
  const stopTypingEffect = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
      
      // Update the displayed message with the full message
      setDisplayedMessage(fullMessageRef.current);
      setMessages(prevMessages => {
        return prevMessages.map((msg, i) => 
          i === prevMessages.length - 1 ? { ...msg, content: fullMessageRef.current } : msg
        );
      });
      setIsTyping(false);
    }
  };
  
  // Typing effect for responses
  const startTypingEffect = (fullText) => {
    setIsTyping(true);
    setDisplayedMessage("");

    fullMessageRef.current = fullText;
    let index = 0;
    const displayRef = { current: "" };

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    // Create and store the new interval
    typingIntervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        displayRef.current += fullText[index];
        setDisplayedMessage(displayRef.current);
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
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
        startTypingEffect("Hello! I'm your NASA AI Assistant powered by Gemini. Ask me anything about space! 🚀");
      }, 800);
    }
    
    // Clean up interval on unmount
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [isOpen]);
  
  // NASA API fetching function
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
      return null; // Return null to indicate we should use Gemini instead
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("NASA API Error:", error);
      return null; 
    }
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    // Stop any ongoing typing effect when asking a new question
    stopTypingEffect();
    
    setLoading(true);
  
    const newMessages = [...messages, { role: "user", content: query }];
    setMessages([...newMessages, { role: "assistant", content: <p className="text-gray-400">Thinking...</p> }]);
    const userQuery = query;
    setQuery("");
    
    // Special case: Check if the user is specifically requesting NASA API data
    const isNasaApiRequest = 
      userQuery.toLowerCase().includes("show me apod") || 
      userQuery.toLowerCase().includes("show mars rover photos") || 
      userQuery.toLowerCase().includes("show epic images") || 
      userQuery.toLowerCase().includes("show asteroid data");
    
    if (isNasaApiRequest) {
      // Use NASA API for specific visualization requests
      const nasaResponse = await fetchNASAData(userQuery);
      
      if (nasaResponse) {
        // Format NASA API data responses as before
        let formattedResponse;
        
        if (Array.isArray(nasaResponse.photos) && nasaResponse.photos.length > 0) {
          // Mars Rover photos
          formattedResponse = nasaResponse.photos.slice(0, 5).map(photo => ({
            type: "image",
            img: photo.img_src,
            camera: `📷 Captured by: ${photo.camera.full_name}`,
            date: `📅 Date: ${photo.earth_date}`,
            rover: `🚀 Rover: ${photo.rover.name}`,
          }));
        } else if (nasaResponse.url) {
          // APOD response
          formattedResponse = {
            type: "image",
            img: nasaResponse.url,
            title: `🌟 NASA's Astronomy Picture of the Day: ${nasaResponse.title}`,
            description: `📖 ${nasaResponse.explanation}`,
          };
        } else if (Array.isArray(nasaResponse) && nasaResponse.length > 0) {
          // EPIC images
          formattedResponse = nasaResponse.slice(0, 5).map(item => ({
            type: "image",
            img: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replaceAll("-", "/")}/png/${item.image}.png`,
            date: `📅 Captured on: ${item.date}`,
          }));
        } else if (nasaResponse.near_earth_objects) {
          // Asteroid Data
          formattedResponse = Object.values(nasaResponse.near_earth_objects)
            .flat()
            .slice(0, 5)
            .map(asteroid => ({
              type: "text",
              name: `🪨 Name: ${asteroid.name}`,
              size: `📏 Estimated Size: ${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km`,
              close_approach_date: `📅 Close Approach: ${asteroid.close_approach_data[0]?.close_approach_date_full || "N/A"}`,
            }));
        }
        
        setMessages([...newMessages, { role: "assistant", content: formattedResponse }]);
      } else {
        // Fallback to Gemini if NASA API fails
        const geminiResponse = await askGemini(userQuery);
        startTypingEffect(geminiResponse);
        setMessages([...newMessages, { role: "assistant", content: "Response typing..." }]);
      }
    } else {
      // For all other queries, use Gemini directly
      const geminiResponse = await askGemini(userQuery);
      
      // Small delay for more natural feeling
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Start typing effect
      startTypingEffect(geminiResponse);
      setMessages([...newMessages, { role: "assistant", content: "Response typing..." }]);
    }
    
    setLoading(false);
  };

  // Determine chat window dimensions based on screen size
  const getChatWindowDimensions = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 480) return "w-11/12 mx-auto h-96"; // Increased height for extra small screens
      if (width < 640) return "w-80 mx-auto h-[400px]"; // Increased height for small screens
      if (width < 768) return "w-80 h-[420px]"; // Increased height for medium screens
      return "w-96 h-[460px]"; // Increased height for large screens
    }
    return "w-80 h-[400px]"; // Increased default height
  };

  return (
    <div className="fixed bottom-5 right-5 z-10">
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
          className={`bg-gray-800 text-white p-3 pb-6 rounded-lg shadow-lg ${getChatWindowDimensions()} fixed bottom-4 right-4 max-w-full sm:max-w-md flex flex-col`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-400" />NASA Bot
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow h-40 sm:h-48 md:h-56 overflow-y-auto border border-gray-700 rounded p-2 space-y-2 mb-3">
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
                          {item.camera && <p className="text-sm mt-1">{item.camera}</p>}
                          {item.date && <p className="text-sm">{item.date}</p>}
                          {item.rover && <p className="text-sm">{item.rover}</p>}
                        </div>
                      ) : (
                        <p>
                          <strong>{item.name}</strong> <br />
                          {item.size} <br />
                          {item.close_approach_date}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  msg.content.img && (
                    <div>
                      <img src={msg.content.img} alt="NASA Data" className="w-full rounded-md" />
                      {msg.content.title && <p className="font-bold mt-1">{msg.content.title}</p>}
                      {msg.content.description && <p className="text-sm">{msg.content.description}</p>}
                    </div>
                  )
                )}
              </div>
            ))}
            {loading && <p className="text-gray-400">Thinking...</p>}
          </div>

          {!nasaMode && (
            <div className="flex flex-col space-y-2 mt-auto">
              <button onClick={() => setQuizOpen(true)} className="bg-green-500 text-white p-2 rounded-md">📝 Start Space Quiz</button>
              <button onClick={() => setNasaMode(true)} className="bg-blue-500 text-white p-2 rounded-md">💬 Ask Me Anything</button>
            </div>
          )}

          {nasaMode && (
            <div className="mt-auto">
              <input
                type="text"
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
                placeholder="Ask me anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              />
              <motion.button
                onClick={handleAsk}
                className="bg-blue-600 text-white p-2 rounded-md mt-2 w-full flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
                disabled={loading}
              >
                <Send size={20} className="mr-2" /> Send
              </motion.button>
              <div className="flex justify-between items-center mt-2">
                <button onClick={() => setNasaMode(false)} className="text-gray-400 underline text-sm">Back</button>
                {isTyping && (
                  <button 
                    onClick={stopTypingEffect} 
                    className="text-green-500 underline text-sm flex items-center"
                  >
                    <StopCircle size={14} className="mr-1" /> Skip Typing Effect
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {quizOpen && <Quiz setQuizOpen={setQuizOpen} isOpen={isOpen} />}
    </div>
  );
};

export default Chatbot;