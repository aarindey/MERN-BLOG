import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/blog/BlogEditor.css";
import config from "../config.json";
import { debounce } from "./utils";
import Comment from "./Comment";

const BlogComment = ({ postId }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const response = await axios.get(
        `${config.API_URL}/api/posts/comments/${postId}`
      );
      const newComments = response.data;
      setComments(newComments.comments);
    };
    loadComments();
  }, [postId, comments]);

  function newComment(commentText, commentId) {
    return {
      comment_by: "Dummy User",
      comment_text: commentText,
      parent_id: commentId,
    };
  }

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/posts/${postId}`
        );

        const { title, content } = response.data[0];
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  function addComment() {
    const apiUrl = `${config.API_URL}/api/posts/comments/${postId}`;
    const newCommentData = newComment(commentInput, null);
    axios
      .post(apiUrl, newCommentData)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
      })
      .catch((error) => {
        console.error("Error posting comment data:", error);
      });

    setCommentInput("");
  }

  function addReply(commentId, reply) {
    const apiUrl = `${config.API_URL}/api/posts/comments/${postId}/${commentId}`;

    const newReplyComment = newComment(reply, commentId);

    axios
      .post(apiUrl, newReplyComment)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
      })
      .catch((error) => {
        console.error("Error posting comment data:", error);
      });
  }

  return (
    <>
      <h1>{title}</h1>
      <h3>{content}</h3>

      <div className="comment-input-box">
        <textarea
          rows="1"
          cols="40"
          value={commentInput}
          onChange={(e) => {
            e.preventDefault();
            debounce(setCommentInput(e.target.value));
          }}
        />
        <br />
        <button
          className="border-[1px] border-zinc-400 w-30 bg-blue-600  hover:bg-sky-700 text-white px-2 py-1"
          onClick={addComment}
        >
          Add Comment
        </button>
      </div>

      <ul>
        {comments.map(
          (comment) =>
            comment.parent_id === null && (
              <Comment
                key={comment.comment_id}
                comment={comment}
                addReply={addReply}
              />
            )
        )}
      </ul>
    </>
  );
};

export default BlogComment;
