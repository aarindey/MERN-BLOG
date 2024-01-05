const Comment = require("../models/comment");

// Controller function to get a specific post by ID
const getComment = async (req, res) => {
  try {
    // Attempt to find the post by its ID
    const comment = await Comment.find({comment_id : req.params.commentId});

    // If the post was not found, return a 404 error
    if (!comment) {
        console.log(comment);
      return res.status(404).json({ error: `Comment not found ${req.params.commentId}` });
    }

    // Respond with the found post as JSON
    res.json(comment);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error getting comment by ID:",req.params.commentId,error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the getPost function for use in other files
module.exports = getComment;
