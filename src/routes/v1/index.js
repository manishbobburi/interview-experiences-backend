const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const votesRouter = require("./votes.routes");
const companiesRouter = require("./companies.routes");

router.use("/users", usersRouter);

router.use("/posts", postsRouter);

router.use("/votes", votesRouter);

router.use("/companies", companiesRouter);

module.exports = router;