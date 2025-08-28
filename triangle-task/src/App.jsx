import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputForm from "./components/InputForm";
import TriangleDisplay from "./components/TriangleDisplay";
import "./App.css"; // או כל קובץ CSS אחר

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/display" element={<TriangleDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
