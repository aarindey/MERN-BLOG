import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Blog from "./pages/Blog";
import Header from "./components/Header";
import BlogPage from "./pages/BlogPage";
import BlogCommentPage from "./pages/BlogCommentPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/LogIn";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      {/* Pass ref as a prop to the Header component */}
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/new/:blogId" element={<BlogCommentPage />} />
          <Route path="/blogs/:blogId" element={<BlogPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
