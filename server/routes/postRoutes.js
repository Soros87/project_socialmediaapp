import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  createPost,
  getPostsBySearch,
  getPost,
  getUserPost,
  getComments,
  likePost,
  likePostComment,
  commentPost,
  replyPostComment,
  deletePost,
  getPosts,
} from "../controllers/postController.js";

const router = express.Router();

//create post
router.post("/create-post", userAuth, createPost);

// get posts
router.get("/", userAuth, getPosts);

//get posts by search FIXME
router.get("/get-post", userAuth, getPostsBySearch);

//get post by post id
router.get("/:id", userAuth, getPost);

//get posts by user id
router.get("/get-user-post/:id", userAuth, getUserPost);

// get comments
router.get("/comments/:postId", getComments);

//like post
router.post("/like/:id", userAuth, likePost);

//like comment or reply of the comment
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);
//comment on the post
router.post("/comment/:id", userAuth, commentPost);
//reply on the comment
router.post("/reply-comment/:id", userAuth, replyPostComment);

//delete post
router.delete("/:id", userAuth, deletePost);

export default router;
