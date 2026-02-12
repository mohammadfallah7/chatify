import express from "express";
import {
  checkAuthentication,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();
/* /api/auth */

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check", protectRoute, checkAuthentication);
authRouter.patch("/update-profile-picture", protectRoute, updateProfile);

export { authRouter };
