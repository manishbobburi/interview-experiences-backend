const express = require("express");
const router = express.Router();

const { voteController } = require("../../controllers");
const { authMiddleware } = require("../../middleware");

router.post("/toggle",
     authMiddleware.checkAuth,
     voteController.toggleLike
);

module.exports = router;