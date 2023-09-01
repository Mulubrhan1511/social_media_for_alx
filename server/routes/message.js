const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model("User");
const Message = mongoose.model("Message");

// Route to get followers of a user
router.get("/followers", requireLogin, async (req, res) => {
    try {
      
      const user = await User.findById(req.user._id).populate("followers", "-password");
      const followers = user.followers.map(follower => {
        const { _id, name, email, pic } = follower;
        return { _id, name, email, pic };
      });
      res.json(followers);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// Route to add a new message
router.post("/messages", requireLogin, async (req, res) => {
  const { recipientId, content } = req.body;

  try {
    const senderId = req.user._id;

    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content: content
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;