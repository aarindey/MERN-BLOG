const Comment = require("../models/comment");

// Controller function to get all posts
const getAllComment = async (req, res) => {
  const { postId } = req.params;
  try {
    // Retrieve all posts from the database
    // const comments = await Comment.find({ post_id: postId }).populate(
    //   "children"
    // );

    const comments = await Comment.find({ post_id: postId });

    return res.status(200).json({ comments });
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the getAllPost function for use in other files
module.exports = getAllComment;
