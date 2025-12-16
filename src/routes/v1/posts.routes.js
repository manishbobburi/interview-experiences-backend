const express = require("express");
const router = express.Router();

const { postController } = require("../../controllers");

router.post("/", 
    postController.createPost
);

router.get("/:id",
    postController.getPost
);

router.get("/",
    postController.getAllPosts
);

router.delete("/:id",
    postController.deletePost
);

module.exports = router;