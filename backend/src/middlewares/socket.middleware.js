import jwt from "jsonwebtoken";
import ENV from "../lib/env.js";
import User from "../models/user.model.js";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    if (!token) {
      console.error("Socket connection rejected - No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.error("Socket connection rejected - Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.error("Socket connection rejected - User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    console.error("Error socket auth middleware", error);
    next(new Error("Error socket auth middleware"));
  }
};

export { socketAuthMiddleware };
