const express = require("express");
const router = express.Router();

const { voteController } = require("../../controllers");
const { authMiddleware } = require("../../middleware");

router.post("/upVote",
     authMiddleware.checkAuth,
     voteController.upVote
);

router.post("/downVote",
     authMiddleware.checkAuth,
     voteController.downVote,
);

router.delete("/removeVote",
     authMiddleware.checkAuth,
     voteController.removeVote
);

module.exports = router;