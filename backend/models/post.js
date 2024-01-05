const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Types: { ObjectId } } = mongoose;

const postSchema = new mongoose.Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      default: () => new ObjectId(), // Generate a unique ID using uuid
    },
    post_by: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
