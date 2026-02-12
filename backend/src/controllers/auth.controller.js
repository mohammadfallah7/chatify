import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/email-handlers.js";
import ENV from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if all fields are provided
  if (!fullName.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  // Password validation
  const passwordErrors = [];
  if (password.length < 6) {
    passwordErrors.push("Password must be at least 6 characters");
  }
  if (password.length > 16) {
    passwordErrors.push("Password must not exceed 16 characters");
  }
  if (!/[A-Z]/.test(password)) {
    passwordErrors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    passwordErrors.push("Password must contain at least one lowercase letter");
  }
  if (!/\d/.test(password)) {
    passwordErrors.push("Password must contain at least one number");
  }
  if (!/^[A-Za-z\d]+$/.test(password)) {
    passwordErrors.push("Password can only contain letters and numbers");
  }

  if (passwordErrors.length > 0) {
    return res.status(400).json({
      message: "Password validation failed",
      errors: passwordErrors,
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashedPassword });

    const savedUser = await newUser.save();
    generateToken(savedUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      response: {
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
      },
    });

    const { error } = await sendWelcomeEmail(
      savedUser.email,
      savedUser.fullName,
      ENV.CLIENT_URL,
    );
    if (error) {
      console.error("Error sending welcome email", error);
    }
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      response: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).json({
      message: "Error login user",
      error: error.message,
    });
  }
};

const logout = (_, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: ENV.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logout user", error);
    res.status(500).json({
      message: "Error logout user",
      error: error.message,
    });
  }
};

const checkAuthentication = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User authenticated successfully",
      response: req.user,
    });
  } catch (error) {
    console.error("Error check authentication", error);
    res.status(500).json({
      message: "Error check authentication",
      error: error.message,
    });
  }
};

// Protected
const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    return res
      .status(400)
      .json({ message: "Profile picture is required in base64 format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true },
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      response: updatedUser,
    });
  } catch (error) {
    console.error("Error update profile", error);
    res.status(500).json({
      message: "Error update profile",
      error: error.message,
    });
  }
};

export { checkAuthentication, login, logout, signup, updateProfile };
