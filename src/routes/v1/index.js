const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const votesRouter = require("./votes.routes");

router.use("/users", usersRouter);

router.use("/posts", postsRouter);

router.use("/votes", votesRouter);

module.exports = router;