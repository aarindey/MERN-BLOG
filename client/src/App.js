// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Header from "./components/Header";
import BlogPage from "./pages/BlogPage";
import BlogCommentPage from "./pages/BlogCommentPage";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./pages/Profile";
import "./App.css";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Save the user's preference in localStorage to persist it across page reloads
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <Header
        user={user}
        loginWithRedirect={loginWithRedirect}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login loginWithRedirect={loginWithRedirect} />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/new/:blogId" element={<BlogCommentPage />} />
          <Route path="/blogs/:blogId" element={<BlogPage />} />
        </Routes>
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </div>
    </Router>
  );
};

export default App;
