import { Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home/Index";
import Navbar from "./components/NavBar";
import SingleArticle from "./components/Pages/SingleArticle/Index";

import "./util/config";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
