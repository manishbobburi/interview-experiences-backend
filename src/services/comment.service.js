const { CommentRepository } = require("../repositories");
const { AppError } = require("../utils/error");
const { StatusCodes } = require("http-status-codes");

const commentRepository = new CommentRepository();

async function createComment(data) {
    const response = await commentRepository.create(data);
    return response;
}

async function getCommentsByPostId(postId) {
    const response = await commentRepository.getCommentsByPostId(postId);
    return response;
}

async function deleteComment(id, reqUser) {
    const comment = await commentRepository.get(id);

    if (comment.userId !== reqUser.id && reqUser.role?.name !== 'ADMIN') {
        throw new AppError("Forbidden: You do not have permission to delete this comment", StatusCodes.FORBIDDEN);
    }

    const response = await commentRepository.destroy(id);
    return response;
}

module.exports = {
    createComment,
    getCommentsByPostId,
    deleteComment
};
