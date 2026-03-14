const express = require("express");
const router = express.Router();

const { postController } = require("../../controllers");
const { authMiddleware, postMiddleware } = require("../../middleware");

router.get("/",
    postController.getAllPosts
);

router.get("/:slug",
    authMiddleware.checkAuth,
    postController.getPost
);

router.get("/user/:userId",
    authMiddleware.checkAuth,
    postController.getPostsByUserId  
);

router.post("/",
    authMiddleware.checkAuth,
    postMiddleware.validateCreatePost,
    postController.createPost
);

router.delete("/:id",
    authMiddleware.checkAuth,
    postController.deletePost
);

module.exports = router;