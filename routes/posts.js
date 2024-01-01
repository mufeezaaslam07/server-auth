const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/like/:postId",  async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const { userId } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { likedBy: userId } },
      { new: true }
    );

    res.status(200).json({ success: true, updatedPost });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
