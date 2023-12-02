import express from "express";
import path from "path";
import {
  verifyEmail,
  resetPassword,
  requestPasswordReset,
  changePassword,
  getUser,
  updateUser,
  friendRequest,
  getFriendRequest,
  acceptRequest,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password/:userId", changePassword);

//user routes :id? optional for own user's posts.
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user/:id", userAuth, updateUser);

//friend request
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);

//accept / deny friend request
router.post("/accept-request", userAuth, acceptRequest);

//render html
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "verifiedpage.html"));
});
router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "passwordreset.html"));
});

export default router;
