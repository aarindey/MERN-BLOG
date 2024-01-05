const Post = require("../models/post");

// Controller function to get a specific post by ID
const getPost = async (req, res) => {
  try {
    // Attempt to find the post by its ID
    const post = await Post.find({ post_id: req.params.postId });

    // If the post was not found, return a 404 error
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Respond with the found post as JSON
    res.json(post);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error getting post by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the getPost function for use in other files
module.exports = getPost;
