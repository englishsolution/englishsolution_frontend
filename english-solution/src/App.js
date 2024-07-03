import "./App.css";
import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import ServiceMenu from './components/ServiceMenu/ServiceMenu';
import ServiceIntro from './pages/ServiceIntro/ServiceIntro';
import UsageGuide from './pages/UsageGuide/UsageGuide';
import Learning from './pages/Learning/Learning';
import Chatbot from './pages/Chatbot/Chatbot';
import Header from "./components/Header/Header";
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Header /> 
        <ServiceMenu /> 
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/video-page" element={<VideoPage />} />
          <Route path="/service-intro" element={<ServiceIntro />} />
          <Route path="/usage-guide" element={<UsageGuide />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
