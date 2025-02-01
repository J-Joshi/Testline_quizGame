import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { score, total, correctCount, wrongCount, wrongQuestions } =
    location.state || {
      lengthQuestion: 0,
      score: 0,
      total: 0,
      correctCount: 0,
      wrongCount: 0,
      wrongQuestions: [],
    };
  const correctAnswer = (q) => {
    let answer;
    q.options.map((ele) => {
      if (ele.isCorrect === true) {
        answer = ele.text;
      }
    });
    return answer;
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-2xl text-center"
      >
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Quiz Analysis
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Score: <span className="font-bold text-green-500">{score}</span> /{" "}
          {total}
        </p>
        <p className="text-lg text-gray-300 mb-4">
          ✅ Correct Answers: <span className="font-bold">{correctCount}</span>
        </p>
        <p className="text-lg text-gray-300 mb-6">
          ❌ Wrong Answers:{" "}
          <span className="font-bold text-red-500">{wrongCount}</span>
        </p>

        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Focus More On These Topics:
        </h3>
        <ul className="text-lg text-gray-200 mb-6">
          {wrongQuestions.length > 0 ? (
            wrongQuestions.map((q, index) => (
              <li key={index} className="mb-2">
                ⚠️ <span className="text-red-400">{q.topic}</span> -{" "}
                {q.question}
                {correctAnswer(q)}
              </li>
            ))
          ) : (
            <p className="text-green-500">Great Job! No wrong answers.</p>
          )}
        </ul>

        <button
          onClick={() => navigate("/")}
          className="btn btn-primary px-6 py-3 text-lg mt-4"
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
};

export default Analysis;
