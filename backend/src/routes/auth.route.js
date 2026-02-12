import express from "express";
import {
  checkAuthentication,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { authLimiter, userLimiter } from "../middlewares/limiter.middleware.js";

const authRouter = express.Router();
/* /api/auth */

authRouter.post("/signup", authLimiter, signup);
authRouter.post("/login", authLimiter, login);
authRouter.post("/logout", authLimiter, logout);
authRouter.get("/check", protectRoute, userLimiter, checkAuthentication);
authRouter.patch(
  "/update-profile-picture",
  protectRoute,
  userLimiter,
  updateProfile,
);

export { authRouter };
