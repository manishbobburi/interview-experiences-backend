const { StatusCodes } = require("http-status-codes");

const { voteService } = require("../services");
const { sendSuccess } = require("../utils/common");

async function upVote(req, res, next) {
    try {
        const vote = await voteService.upVote(req.body);

        return sendSuccess(
            res, 
            vote, 
            "Up vote successfull", 
            StatusCodes.CREATED
        );      
    } catch (err) {
        next(err);
    }
}

async function downVote(req, res, next) {
    try {
        const vote = await voteService.downVote(req.body);

        return sendSuccess(
            res, 
            vote, 
            "Down vote successfull", 
            StatusCodes.CREATED
        );      
    } catch (err) {
        next(err);
    }
}

async function removeVote(req, res, next) {
    try {
        const vote = await voteService.removeVote(req.body);

        return sendSuccess(
            res, 
            vote, 
            "Removed vote successfully", 
            StatusCodes.CREATED
        );      
    } catch (err) {
        next(err);
    }
}

module.exports = {
    upVote,
    downVote,
    removeVote,
}