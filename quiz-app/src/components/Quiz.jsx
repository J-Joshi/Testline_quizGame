import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]); // Store wrong answered questions
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quiz");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.questions) {
          const formattedQuestions = data.questions.map((q) => ({
            id: q.id,
            question: q.description,
            topic: q.topic, // Add topic for analysis
            options: q.options.map((opt) => ({
              id: opt.id,
              text: opt.description,
              isCorrect: opt.is_correct,
            })),
          }));

          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error.message);
      }
    };

    fetchQuizData();
  }, []);

  // Automatically navigate to the analysis page when all questions are answered
  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0) {
      navigate("/analysis", {
        state: {
          score,
          total: questions.length * 4,
          correctCount,
          wrongCount,
          wrongQuestions,
        },
      });
    }
  }, [
    currentIndex,
    score,
    correctCount,
    wrongCount,
    wrongQuestions,
    questions,
    navigate,
  ]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const nextQuestion = () => {
    if (selectedAnswer) {
      if (selectedAnswer.isCorrect) {
        setScore(score + 4);
        setCorrectCount(correctCount + 1);
      } else {
        setWrongCount(wrongCount + 1);
        setWrongQuestions([...wrongQuestions, questions[currentIndex]]);
      }

      setSelectedAnswer(null);

      // Move to next question
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!questions.length)
    return (
      <p className="text-center text-white text-xl">Loading questions...</p>
    );

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {questions[currentIndex]?.question}
        </h2>
        <div className="space-y-4">
          {questions[currentIndex]?.options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option)}
              className={`w-full py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300
                ${
                  selectedAnswer?.id === option.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {option.text}
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextQuestion}
          disabled={!selectedAnswer}
          className="w-full mt-6 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Quiz;
