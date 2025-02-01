import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          🚀 Welcome to Quiz Master!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test your knowledge and earn points! 🎯
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/quiz")}
          className="btn btn-primary px-8 py-3 text-lg shadow-lg"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartPage;
