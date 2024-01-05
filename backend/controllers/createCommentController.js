const Comment = require("../models/comment");
const { Types: { ObjectId } } = require('mongoose');

// Controller function to create a new post
const createComment = async (req, res) => {
  const { postId, parentCommentId } = req.params;
  const { comment_by, comment_text,parent_id } = req.body;

  try {
    let parentComment;

    let findParentComment = async (comments, targetId) => {
      for (let comment of comments) {
        console.log(comment.comment_id," : ",targetId);
        const targetObjectId = new ObjectId(targetId);
        if (comment.comment_id.equals(targetObjectId)) {
            console.log(comment.comment_id," ok ",targetId);
          return comment;
        }

        if (comment.children && comment.children.length > 0) {
          let childComments = await Comment.find({
            comment_id: { $in: comment.children },
          });

          let foundInChild = await findParentComment(childComments, targetId);
          if (foundInChild) return foundInChild;
        }
      }

      return null;
    };

    if (parentCommentId) {
      const comment = await Comment.find({ post_id: postId });

      parentComment =await findParentComment(comment, parentCommentId);
      console.log("parent comment : ", parentComment, comment, parentCommentId);
    }

    const newComment = new Comment({
      post_id: postId,
      comment_by: comment_by,
      comment_text: comment_text,
      parent_id: parent_id,
    });

    if (parentComment) {
      parentComment.children.push(newComment.comment_id);
      await Comment.updateOne({ post_id: postId,comment_id: parentCommentId }, { $push: { children: newComment.comment_id } });
     // await parentComment.save();
      //await parentComment.save();
    }

    const savedComment = await newComment.save();

    // Respond with the saved post as JSON
    res.json(savedComment);
  } catch (error) {
    // Handle errors by logging and sending an error response
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the createPost function for use in other files
module.exports = createComment;
