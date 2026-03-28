const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const votesRouter = require("./votes.routes");
const companiesRouter = require("./companies.routes");
const sitemapRouter = require("./sitemap.routes");
const authRouter = require("./auth.routes");

router.use("/auth", authRouter);

router.use("/users", usersRouter);

router.use("/posts", postsRouter);

router.use("/votes", votesRouter);

router.use("/companies", companiesRouter);

router.use("/", sitemapRouter);

module.exports = router;