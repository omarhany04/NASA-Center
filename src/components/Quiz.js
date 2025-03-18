import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Quiz = ({ setQuizOpen }) => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizQuestions = [
    { question: "1. What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { question: "2. Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Mercury", "Neptune"], answer: "Mars" },
    { question: "3. How many moons does Earth have?", options: ["1", "2", "5", "None"], answer: "1" },
    { question: "4. Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
    { question: "5. What is the name of NASA’s most famous space telescope?", options: ["Kepler", "Chandra", "Hubble", "James Webb"], answer: "Hubble" }
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
        setQuizCompleted(true); 
      }
    }, 1250);
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
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

      {quizCompleted ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">🎉 Quiz Completed!</h2>
          <p className="text-lg">Your Score: {quizScore} / {quizQuestions.length}</p>
          <button onClick={restartQuiz} className="mt-3 bg-teal-500 text-white p-2 rounded-md w-full">↻ Restart Quiz</button>
          <button onClick={() => setQuizOpen(false)} className="mt-2 text-gray-400 underline text-sm">Close</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </motion.div>
  );
};

export default Quiz;
