// BlogEditor.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../redux/actions/postActions";
import axios from "axios";
import "../styles/blog/BlogEditor.css";
import config from "../config.json";

const BlogEditor = ({ postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Assuming you have a Redux state for the selected post
  // const selectedPost = useSelector((state) => state.selectedPost);

  // Fetch the actual title and content when the component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/posts/${postId}`);
        const {title,content}=response.data[0];
        //console.log("Soujash gandu : ", response.data[0].title);
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
    const textarea = document.getElementById("contentTextarea");
    textarea.style.height = textarea.scrollHeight + "px";
    localStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    localStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  useEffect(() => {
    const autosave = setTimeout(() => {
      dispatch(updatePost({ title, content }, postId));
      // Set the height of the textarea to its scrollHeight
      const textarea = document.getElementById("contentTextarea");
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
      const savedScrollPosition = localStorage.getItem("scrollPosition");
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
      // Reset scroll behavior to default (non-smooth) after setting the scroll position
      document.documentElement.style.scrollBehavior = "auto";
    }, 1000);

    return () => clearTimeout(autosave);
  }, [content, dispatch, title, postId]);

  // Save the scroll position to localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    };
  }, []);

  return (
    <div className="blog-container mt-4">
      {/* <p className="mb-2">{autosaving ? "Saving..." : "Saved"}</p> */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label input-title ">
          <h5>Title</h5>
        </label>

        <input
          type="text"
          className="form-control input-text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          style={{ fontSize: "larger" }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label input-content">
          <h5>Content</h5>
        </label>

        <textarea
          id="contentTextarea"
          className="form-control textarea-content p-4"
          value={content}
          onChange={handleContentChange}
          style={{ overflow: "hidden", backgroundColor: "#fff" }}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
