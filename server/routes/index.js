import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute, express.static("dist"));

export default router;
