import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();
/* /api/auth */

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export { authRouter };
