import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./component/Portfolio.jsx";
import EduhubPreview from "./component/project/WorldEduhub.jsx";
import Success from "./component/Success.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/world-eduhub" element={<EduhubPreview />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}
