const { StatusCodes } = require("http-status-codes");
const { commentService } = require("../services");
const { sendSuccess } = require("../utils/common");

async function createComment(req, res, next) {
    try {
        const payload = {
            ...req.body,
            userId: req.user.id
        };
        const comment = await commentService.createComment(payload);
        return sendSuccess(res, comment, "Comment created successfully", StatusCodes.CREATED);
    } catch (err) {
        next(err);
    }
}

async function getCommentsByPostId(req, res, next) {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.postId);
        return sendSuccess(res, comments, "Comments retrieved successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

async function deleteComment(req, res, next) {
    try {
        const response = await commentService.deleteComment(req.params.id, req.user);
        return sendSuccess(res, response, "Comment deleted successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createComment,
    getCommentsByPostId,
    deleteComment
};
