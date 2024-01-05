// Blog.js
import React from "react";
import { useParams } from "react-router-dom";
import BlogComment from "../components/BlogComment";

const BlogCommentPage = () => {
  const { blogId } = useParams();

  return <BlogComment postId={blogId} />;
};

export default BlogCommentPage;
