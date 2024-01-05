const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = mongoose;

const commentSchema = new mongoose.Schema(
  {
    comment_id: {
      type: Schema.Types.ObjectId,
      default: () => new ObjectId(), // Generate a unique ID using uuid
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    comment_by: String,
    comment_text: String,
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
