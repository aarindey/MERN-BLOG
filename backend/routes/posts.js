const express = require("express");
const router = express.Router();
const getAllPost = require("../controllers/getAllPostController");
const getPost = require("../controllers/getPostController");
const updatePost = require("../controllers/updatePostController");
const deletePost = require("../controllers/deletePostController");
const createPost = require("../controllers/createPostController");
const getAllComment = require("../controllers/getAllCommentController");
const getComment = require("../controllers/getCommentController");
const createComment = require("../controllers/createCommentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createPost); // create post
router.get("/", getAllPost); // get all post
router.get("/:postId", getPost); // get post
router.put("/:postId", updatePost); // update post
router.delete("/:postId", deletePost); // delete post
router.get("/comments/:postId", getAllComment);
router.get("/comment/:commentId", getComment);
router.post("/comments/:postId/:parentCommentId?", createComment);

module.exports = router;
