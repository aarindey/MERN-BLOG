import axios from "axios";
import React, { useState } from "react";
import config from "../config.json";
import commentLogo from "../img/comment-icon.svg";


const BlogCard = ({ post, setPosts }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (postId) => {
    try {
      // Send a delete request to remove the post with the specified ID
      await axios.delete(`${config.API_URL}/api/posts/${postId}`);

      // Update the local state to reflect the deletion
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <div
          style={{
            maxHeight: expanded ? "none" : "300px",
            overflow: expanded ? "visible" : "hidden",
          }}
        >
          <h4 className="card-title">{post.title}</h4>
          <hr></hr>
          <pre className="card-text" style={{ whiteSpace: "pre-wrap" }}>
            {post.content}
          </pre>
        </div>

        <div className="hstack pt-2">
          <button className="btn btn-secondary m-2" onClick={toggleContent}>
            {expanded ? "Collapse" : "Expand"}
          </button>
          <a href={`/blog/new/${post.post_id}`} className="comment_btn ms-auto">
          <img src={commentLogo} alt="problem" className='logo'/>
          </a>
          <a href={`/blog/${post.post_id}`} className="btn btn-primary ">
            Edit
          </a>
          <button
            className="btn text-bg-danger m-2"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
