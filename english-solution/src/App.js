// App.js
import "./App.css";
import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/video-page" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
