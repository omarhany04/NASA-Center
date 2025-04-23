import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Quiz = ({ setQuizOpen, isOpen }) => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPosition, setQuizPosition] = useState({
    position: "fixed",
    bottom: "5rem",
    right: "5rem"
  });

  // Quiz questions array
  const quizQuestions = [
    { question: "1. What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { question: "2. Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Mercury", "Neptune"], answer: "Mars" },
    { question: "3. How many moons does Earth have?", options: ["1", "2", "5", "None"], answer: "1" },
    { question: "4. Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
    { question: "5. What is the name of NASA's most famous space telescope?", options: ["Kepler", "Chandra", "Hubble", "James Webb"], answer: "Hubble" }
  ];

  // Handle window resize to adjust quiz position
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        
        if (width < 480) {
          // For extra small screens - position above the chat if chatbot is open
          if (isOpen) {
            setQuizPosition({
              position: "fixed",
              bottom: "18rem", // Position above chatbot
              right: "4px",
              left: "4px",
              maxHeight: "14rem"
            });
          } else {
            setQuizPosition({
              position: "fixed",
              bottom: "4rem",
              right: "4px", 
              left: "4px",
              maxHeight: "16rem"
            });
          }
        } else if (width < 640) {
          // For small screens
          if (isOpen) {
            setQuizPosition({
              position: "fixed",
              bottom: "20rem", // Position above chatbot
              right: "auto",
              left: "50%",
              transform: "translateX(-50%)",
              maxHeight: "16rem",
              width: "75%"
            });
          } else {
            setQuizPosition({
              position: "fixed",
              bottom: "4rem",
              right: "4px",
              maxHeight: "18rem",
              width: "75%"
            });
          }
        } else if (width < 768) {
          // For medium screens
          setQuizPosition({
            position: "fixed",
            bottom: "4rem",
            right: isOpen ? "calc(18rem + 32px)" : "4rem", // 32px gap (2rem) between components
            maxHeight: "20rem"
          });
        } else {
          // For larger screens - positioned to the left with a larger gap
          setQuizPosition({
            position: "fixed",
            bottom: "4rem",
            right: isOpen ? "calc(24rem + 48px)" : "4rem", // 48px gap (3rem) between components
            maxHeight: "24rem"
          });
        }
      }
    };

    // Initial position setup
    handleResize();
    
    // Add resize listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Get quiz dimensions based on screen size
  const getQuizDimensions = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 480) return "w-11/12 mx-auto max-h-64"; // extra small screens
      if (width < 640) return "w-3/4 max-h-72"; // small screens
      return "w-72 max-h-80"; // medium and large screens
    }
    return "w-72 max-h-80"; // default
  };

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
        setQuizCompleted(true); 
      }
    }, 1250);
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  // Dynamic styles for the quiz container based on calculated position
  const quizContainerStyles = {
    position: quizPosition.position,
    bottom: quizPosition.bottom,
    right: quizPosition.right,
    left: quizPosition.left
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`bg-gray-800 text-white p-3 rounded-lg shadow-lg ${getQuizDimensions()} z-20 overflow-y-auto`}
      style={quizContainerStyles}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base sm:text-lg font-bold">🧑‍🚀 Space Quiz</h3>
        <button onClick={() => setQuizOpen(false)} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {quizCompleted ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">🎉 Quiz Completed!</h2>
          <p className="text-lg">Your Score: {quizScore} / {quizQuestions.length}</p>
          <button onClick={restartQuiz} className="mt-3 bg-teal-500 text-white p-2 rounded-md w-full">↻ Restart Quiz</button>
          <button onClick={() => setQuizOpen(false)} className="mt-2 text-gray-400 underline text-sm">Close</button>
        </div>
      ) : (
        <>
          <p className="text-lg font-bold mb-2 break-words">{quizQuestions[quizStep].question}</p>
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
        </>
      )}
    </motion.div>
  );
};

export default Quiz;