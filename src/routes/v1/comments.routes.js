const express = require("express");
const router = express.Router();
const { commentController } = require("../../controllers");
const { authMiddleware } = require("../../middleware");

router.post("/", authMiddleware.checkAuth, commentController.createComment);
router.get("/post/:postId", commentController.getCommentsByPostId);
router.delete("/:id", authMiddleware.checkAuth, commentController.deleteComment);

module.exports = router;
