import React, { useState, useEffect, useCallback } from "react";
import "../styles/comment.css";
import config from "../config.json";
import axios from "axios";

const Comment = ({ comment, addReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState("");
  const [showChildReply, setShowChildReply] = useState("");
  const [childComments, setChildComments] = useState([]);

  const fetchChildComments = useCallback(async () => {
    const fetchedChildComments = await Promise.all(
      comment.children.map(async (childCommentId) => {
        try {
          const response = await axios.get(
            `${config.API_URL}/api/posts/comment/${childCommentId}`
          );
          console.log(" check data :", response.data[0]);
          return response.data[0];
        } catch (e) {
          console.log("Error fetching comment data by Id", e);
          return null;
        }
      })
    );
    setChildComments(
      fetchedChildComments.filter((newComment) => newComment !== null)
    );
  }, [comment.children]);

  useEffect(() => {
    if (comment.children && comment.children.length > 0) {
      fetchChildComments();
    }
  }, [comment.children, fetchChildComments]);

  const renderChildComments = () => {
    return (
      <ul>
        {childComments.map((childComment) => (
          <Comment
            key={childComment.comment_id}
            comment={childComment}
            addReply={addReply}
          />
        ))}
      </ul>
    );
  };

  const handleAddReply = async () => {
    await addReply(comment.comment_id, replyText);
    await fetchChildComments(1);
    setShowReplyBox(false);
    setReplyText("");
    setShowChildReply(true);
  };

  const handleCancelReply = async () => {
    setShowReplyBox(false);
  };

  return (
    <li className="comment_item" key={comment.comment_id}>
      <div className="comment-body">
        <p>{comment.comment_text}</p>
        {!showReplyBox && (
          <>
            <button
              type="button"
              className="comment_btn reply ml-3 mr-3"
              onClick={() => {
                setShowReplyBox(true);
              }}
            >
              reply
            </button>
            {comment.children.length > 0 && (
              <button
                onClick={() => {
                  setShowChildReply(!showChildReply);
                }}
                className="cancel"
              >
                {comment.children.length}{" "}
                {comment.children.length > 1 ? "Replies" : "Reply"}
              </button>
            )}
          </>
        )}

        {showReplyBox && (
          <div className="reply_box">
            <br />
            <textarea
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
              rows="2" cols="20"
              type="text"
            />
            <br />
            <button
              type="button"
              onClick={handleAddReply}
              className="comment_btn add"
            >
              Add
            </button>
            <button onClick={handleCancelReply} className="comment_btn cancel">
              Cancel
            </button>
          </div>
        )}
      </div>
      {showChildReply &&
        comment.children &&
        renderChildComments(comment.children)}
    </li>
  );
};

export default Comment;
