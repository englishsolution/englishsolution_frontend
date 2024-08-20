import "./App.css";
import React, { useState } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import ServiceMenu from "./components/ServiceMenu/ServiceMenu";
import ServiceIntro from "./pages/ServiceIntro/ServiceIntro";
import UsageGuide from "./pages/UsageGuide/UsageGuide";
import Learning from "./pages/Learning/Learning";
import Chatbot from "./pages/Chatbot/Chatbot";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import FindId from "./pages/FindId/FindId";
import FindPassword from "./pages/FindPassword/FindPassword";
import SavelistPage from "./pages/SavelistPage/SavelistPage";
import QuizTemplate from "./pages/Learning/Quiz/QuizTemplate";
import QuizResult from "./pages/Learning/Quiz/QuizResult";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ServiceMenu />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/service-intro" element={<ServiceIntro />} />
          <Route path="/usage-guide" element={<UsageGuide />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/save-list" element={<SavelistPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn onLogin={handleLogin} />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />

          <Route
            path="/learning/Quiz/:quizType/:videoId"
            element={<QuizTemplate />}
          />
          <Route
            path="/learning/Quiz/:quizType/:videoId/quiz-result"
            element={<QuizResult />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
