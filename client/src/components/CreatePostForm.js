import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostForm = ({ onPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = "Bearer " + localStorage.getItem("token");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
    const textarea = document.getElementById("contentTextarea");
    if (textarea) {
      textarea.style.height = textarea.scrollHeight + "px";
    }
    document.documentElement.style.scrollBehavior = "auto";
  };

  const handlePostClick = async () => {
    setLoading(true);
    if (title.trim() !== "" && content.trim() !== "") {
      try {
        await onPost({ title, content }, { headers: { Authorization: token } });
        setTitle("");
        setContent("");
        navigate("/");
      } catch (error) {
        console.error("Error while creating blog ", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in both title and content fields.");
      setLoading(false);
    }
  };

  return (
    <div className="create-post-form">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
          style={{ fontWeight: "bold", fontSize: "large" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="contentTextarea"
          value={content}
          onChange={handleContentChange}
          style={{ overflow: "hidden" }}
        />
      </div>
      <div className="hstack">
        <button className="btn btn-success ms-auto" onClick={handlePostClick}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
