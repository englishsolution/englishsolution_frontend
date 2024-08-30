import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import ServiceMenu from "./components/ServiceMenu/ServiceMenu";
import ServiceIntro from "./pages/ServiceIntro/ServiceIntro";
import UsageGuide from "./pages/UsageGuide/UsageGuide";
import Learning from "./pages/Learning/Learning";
import Chatbot from "./pages/Chatbot/Chatbot";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import SignUpComplete from "./pages/SignUp/SignUpComplete";
import LogIn from "./pages/LogIn/LogIn";
import FindId from "./pages/FindId/FindId";
import FindPassword from "./pages/FindPassword/FindPassword";
import SavelistPage from "./pages/SavelistPage/SavelistPage";
import QuizTemplate from "./pages/Learning/Quiz/QuizTemplate";
import QuizResult from "./pages/Learning/Quiz/QuizResult";

import { AuthProvider, useAuth } from "./pages/AuthContext/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { auth, logout } = useAuth();

  return (
    <div>
      <Header isLoggedIn={!!auth} onLogout={logout} />
      <ServiceMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/service-intro" element={<ServiceIntro />} />
        <Route path="/usage-guide" element={<UsageGuide />} />
        <Route path="/learning" element={<PrivateRoute element={Learning} />} />
        <Route path="/chatbot" element={<PrivateRoute element={Chatbot} />} />
        <Route
          path="/save-list"
          element={<PrivateRoute element={SavelistPage} />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up-complete" element={<SignUpComplete />} />
        <Route path="/log-in" element={<LogIn />} />
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
  );
};

export default App;
