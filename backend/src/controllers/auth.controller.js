import bcrypt from "bcryptjs";
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
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const login = (req, res) => {
  res.send("Login endpoint");
};

const logout = (req, res) => {
  res.send("Logout endpoint");
};

export { login, logout, signup };
