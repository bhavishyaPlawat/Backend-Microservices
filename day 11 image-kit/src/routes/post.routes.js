const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const createPostController = require("../controller/post.controller");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST:- /api/posts  [protected] -> receive {image-file}
router.post("/", authMiddleware, upload.single("image"), createPostController);

module.exports = router;
