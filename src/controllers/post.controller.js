const { StatusCodes } = require("http-status-codes");

const { postService, userService } = require("../services");
const { sendSuccess } = require("../utils/common");

async function createPost(req, res, next) {
    try {
        const post = await postService.createPost(req.validatedBody);

        return sendSuccess(
            res,
            post,
            "Post created successfully",
            StatusCodes.CREATED
        );
    } catch (err) {
        next(err);
    }
}

async function getPost(req, res, next) {
    try {
        const userId = req.user?.id;
        const post = await postService.getPost(req.params.slug, userId);

        return sendSuccess(
            res,
            post,
            "Post retrieved successfully",
            StatusCodes.OK
        );
    } catch (err) {
        next(err);
    }
}

async function getPostsByUserId(req, res, next) {
    try {
        const post = await postService.getPostsByUserId(req.params.userId, req.user?.id);

        return sendSuccess(
            res,
            post,
            "Post retrieved successfully",
            StatusCodes.OK
        );
    } catch (err) {
        next(err);
    }
}

async function getAllPosts(req, res, next) {
    try {
        const cursor =
            req.query.createdAt && req.query.id
                ? {
                    createdAt: req.query.createdAt,
                    id: Number(req.query.id),
                }
                : null;

        let userId = null;
        const token = req.headers["x-access-token"] || req.headers.authorization?.split(" ")[1];
        if (token) {
            const user = await userService.isAuthenticated(token);
            userId = user.id;
        }

        const posts = await postService.getAllPosts(cursor, userId);
        
        return sendSuccess(
            res,
            posts,
            "Posts retrieved successfully",
            StatusCodes.OK
        );
    } catch (err) {
        next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        const response = await postService.deletePost(req.params.id, req.user);

        return sendSuccess(
            res,
            response,
            "Post deleted successfully",
            StatusCodes.OK
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createPost,
    getPost,
    getPostsByUserId,
    getAllPosts,
    deletePost,
}