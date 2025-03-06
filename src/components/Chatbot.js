import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [nasaMode, setNasaMode] = useState(false);

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

  const quizQuestions = [
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Mercury", "Neptune"], answer: "Mars" },
    { question: "How many moons does Earth have?", options: ["1", "2", "5", "None"], answer: "1" },
    { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
    { question: "What is the name of NASA’s most famous space telescope?", options: ["Kepler", "Chandra", "Hubble", "James Webb"], answer: "Hubble" }
  ];

  const handleQuizAnswer = (selectedOption) => {
    setShowAnswer(true);

    if (selectedOption === quizQuestions[quizStep].answer) {
      setQuizScore(prevScore => prevScore + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("wrong");
    }    

    setTimeout(() => {
      setShowAnswer(false);
      setAnswerStatus(null);

      if (quizStep + 1 < quizQuestions.length) {
        setQuizStep(prevStep => prevStep + 1);
      } else {
        const finalScore = selectedOption === quizQuestions[quizStep].answer ? quizScore + 1 : quizScore;
        alert(`Quiz finished! 🎉 Your score: ${finalScore}/${quizQuestions.length}`);

        setQuizOpen(false);
        setQuizStep(0);
        setQuizScore(0);
      }
    }, 1250);
  };


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
        // Mars Rover photos
        formattedResponse = response.photos.slice(0, 5).map(photo => ({
          type: "image",
          img: photo.img_src,
          camera: photo.camera.full_name,
          date: photo.earth_date,
          rover: photo.rover.name,
        }));
      } else if (response.url) {
        // APOD response
        formattedResponse = {
          type: "image",
          img: response.url,
          title: response.title,
          description: response.explanation,
        };
      } else if (Array.isArray(response) && response.length > 0) {
        // EPIC images
        formattedResponse = response.slice(0, 5).map(item => ({
          type: "image",
          img: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replaceAll("-", "/")}/png/${item.image}.png`,
          date: item.date,
        }));
      } else if (response.near_earth_objects) {
        // Asteroid Data
        formattedResponse = Object.values(response.near_earth_objects)
          .flat()
          .slice(0, 5)
          .map(asteroid => ({
            type: "text",
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
        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 fixed bottom-5 right-5"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">🚀 NASA Virtual Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="h-48 overflow-y-auto border border-gray-700 rounded p-2 space-y-2">
        {messages.map((msg, index) => (
        <div key={index} className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
        {typeof msg.content === "string" ? (
        msg.content
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
        <button onClick={() => setQuizOpen(true)} className="bg-green-500 text-white p-2 rounded-md">🌟 Start Space Quiz</button>
        <button onClick={() => setNasaMode(true)} className="bg-blue-500 text-white p-2 rounded-md">🚀 NASA Data</button>
       </div>
        )}


        {nasaMode && (
          <div className="mt-3">
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
              placeholder="Ask me about NASA..."
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

    {quizOpen && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 fixed bottom-5 right-96"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">🧑‍🚀 Space Quiz</h3>
          <button onClick={() => setQuizOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <p className="text-lg font-bold mb-2">{quizQuestions[quizStep].question}</p>
        {quizQuestions[quizStep].options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => handleQuizAnswer(opt)}
            className={`p-2 rounded-md block w-full mt-1 ${
              showAnswer && opt === quizQuestions[quizStep].answer ? "bg-green-500" : 
              showAnswer && answerStatus === "wrong" && opt !== quizQuestions[quizStep].answer ? "bg-red-500" : "bg-gray-700"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {opt}
          </motion.button>
        ))}
      </motion.div>
    )}
  </div>
);
};

export default Chatbot;

