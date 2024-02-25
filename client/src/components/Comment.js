import React, { useState, useEffect, useCallback } from "react";
import "../styles/comment.css";
import config from "../config.json";
import axios from "axios";

const Comment = ({ comment, addReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showChildReply, setShowChildReply] = useState(false);
  const [childComments, setChildComments] = useState([]);

  const fetchChildComments = useCallback(async () => {
    const fetchedChildComments = await Promise.all(
      comment.children.map(async (childCommentId) => {
        try {
          const response = await axios.get(
            `${config.API_URL}/api/posts/comment/${childCommentId}`
          );
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
      <ul className="ml-4">
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
    await fetchChildComments();
    setShowReplyBox(false);
    setReplyText("");
    setShowChildReply(true);
  };

  const handleCancelReply = async () => {
    setShowReplyBox(false);
  };

  return (
    <li className="comment_item" key={comment.comment_id}>
      <div className="comment-body m-2">
        <p className="text-gray-800">{comment.comment_text}</p>
        {!showReplyBox && (
          <div className="flex items-center">
            <button
              type="button"
              className="border-[1px] border-zinc-400 w-30 bg-blue-600  hover:bg-sky-700 text-white px-2 py-1 mr-2"
              onClick={() => setShowReplyBox(true)}
            >
              Reply
            </button>
            {comment.children.length > 0 && (
              <button
                onClick={() => setShowChildReply(!showChildReply)}
                className="text-gray-500  hover:bg-gray-300 px-2 py-1"
              >
                {comment.children.length}{" "}
                {comment.children.length > 1 ? "Replies" : "Reply"}
              </button>
            )}
          </div>
        )}

        {showReplyBox && (
          <div className="reply_box mt-2">
            <textarea
              onChange={(e) => setReplyText(e.target.value)}
              rows="2"
              className="block w-full py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Type your reply here..."
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={handleAddReply}
                className="-mr-0.5 bg-blue-600  hover:bg-blue-700 text-white add"
              >
                Add
              </button>
              <button onClick={handleCancelReply} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {showChildReply && comment.children && renderChildComments()}
    </li>
  );
};

export default Comment;
