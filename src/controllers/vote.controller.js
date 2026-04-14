const { StatusCodes } = require("http-status-codes");

const { voteService } = require("../services");
const { sendSuccess } = require("../utils/common");

async function toggleLike(req, res, next) {
    try {
        const payload = {
            userId: req.user.id,
            postId: req.body.postId
        };
        const result = await voteService.toggleLike(payload);

        return sendSuccess(
            res, 
            result, 
            result.liked ? "Liked successfully" : "Unliked successfully", 
            StatusCodes.OK
        );      
    } catch (err) {
        next(err);
    }
}

module.exports = {
    toggleLike,
}