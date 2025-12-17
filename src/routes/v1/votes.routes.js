const express = require("express");
const router = express.Router();

const { voteController } = require("../../controllers");

router.post("/upVote",
     voteController.upVote
);

router.post("/downVote",
    voteController.downVote,
);

router.delete("/removeVote",
     voteController.removeVote
);

module.exports = router;