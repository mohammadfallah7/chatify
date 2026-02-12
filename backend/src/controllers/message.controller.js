import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const getAllContacts = async (req, res) => {
  const userId = req.user._id;

  try {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    return res.json({
      message: "All contacts fetched successfully",
      response: users,
    });
  } catch (error) {
    console.error("Error getting all contacts", error);
    res.status(500).json({
      message: "Error getting all contacts",
      error: error.message,
    });
  }
};

const getChatPartners = async (req, res) => {
  const userId = req.user._id;

  try {
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
    const chatPartnerIds = [
      ...new Set(
        messages.map((message) =>
          message.senderId.toString() === userId.toString()
            ? message.receiverId.toString()
            : message.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    return res.json({
      message: "Chat partners fetched successfully",
      response: chatPartners,
    });
  } catch (error) {
    console.error("Error getting chat partners", error);
    res.status(500).json({
      message: "Error getting chat partners",
      error: error.message,
    });
  }
};

const getMessagesByUserId = async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.id;

  if (!mongoose.isValidObjectId(targetUserId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    return res.json({
      message: "Messages fetched successfully",
      response: messages,
    });
  } catch (error) {
    console.error("Error getting messages by user id", error);
    res.status(500).json({
      message: "Error getting messages by user id",
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.id;
  const { text, image } = req.body;

  if (!text && !image) {
    return res.status(400).json({
      message: "Message text or image is required",
    });
  }

  try {
    const recipient = await User.findById(targetUserId).select("_id");
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const message = new Message({
      senderId: userId,
      receiverId: targetUserId,
      text,
      image,
    });
    const savedMessage = await message.save();

    // #TODO: send message in real-time if target user is online - socket.io

    return res.json({
      message: "Message sent successfully",
      response: savedMessage,
    });
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

export { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage };
