import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { connectDB } from "./lib/db.js";
import ENV from "./lib/env.js";
import { authRouter } from "./routes/auth.route.js";
import { messageRouter } from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3001;

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cookieParser()); // req.cookies
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
