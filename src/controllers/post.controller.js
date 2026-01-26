const { StatusCodes } = require("http-status-codes");

const { postService } = require("../services");
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
        const post = await postService.getPost(req.params.id);

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
        const post = await postService.getPostsByUserId(req.params.userId);

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
        const posts = await postService.getAllPosts();
        
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
        const response = await postService.deletePost(req.params.id);

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