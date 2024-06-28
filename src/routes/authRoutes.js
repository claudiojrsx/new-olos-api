import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const authController = new AuthController();

router.get("/auth", authController.auth);

export default router;
