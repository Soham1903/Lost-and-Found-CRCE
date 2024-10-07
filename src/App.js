import "./App.css";
import Form from "./Components/Form";
import Home from "./Components/Home";
import UploadForm from "./Components/UploadForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
