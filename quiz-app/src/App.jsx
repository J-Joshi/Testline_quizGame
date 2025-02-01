import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import Quiz from "./components/Quiz";

import Analysis from "./components/Analysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
