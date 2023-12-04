import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { createPost } from "../controllers/postController.js";

const router = express.Router();

//create post
router.post("/create-post", userAuth, createPost);

export default router;
