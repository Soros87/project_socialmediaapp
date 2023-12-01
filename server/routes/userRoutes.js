import express from "express";
import path from "path";
import {
  verifyEmail,
  resetPassword,
  requestPasswordReset,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password/:userId", changePassword);

//render html
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "verifiedpage.html"));
});
router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "passwordreset.html"));
});

export default router;
