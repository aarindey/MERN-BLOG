// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/Home.css";
import config from "../config.json";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // Fetch all posts from the API

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    setloading(true);
    fetchPosts();
    setloading(false);
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  while (loading) {
    return (
      <div className="d-flex justify-content-center mt-5 pt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      {posts.map((post) => (
        <BlogCard key={post.post_id} post={post} setPosts={setPosts} />
      ))}
    </div>
  );
};

export default Home;
