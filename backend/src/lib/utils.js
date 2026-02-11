import jwt from "jsonwebtoken";
import ENV from "./env.js";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};

export { generateToken };
