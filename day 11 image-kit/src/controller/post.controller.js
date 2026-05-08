const postModel = require("../models/post.model");
const GenerateCaption = require("../service/AI.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    console.log("file received ✅");
    const base64Image = Buffer.from(file.buffer).toString("base64");

    // Generate caption using AI
    const caption = await GenerateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    // Create and save the post
    const newPost = await postModel.create({
      caption: caption,
      image: result.url,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = createPostController;
