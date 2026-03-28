const { StatusCodes } = require("http-status-codes");

const { authService } = require("../services");
const { sendSuccess } = require("../utils/common");

const { AppError } = require("../utils/error");

async function verifyEmail(req, res, next) {
    try {
        const token = req.query.token;
        const response = await authService.verifyEmail(token);
        return sendSuccess(res, response, "Email verified successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

async function resendVerification(req, res, next) {
    try {
        const email = req.body?.email;
        if (!email) {
            throw new AppError("Email is required in the request body", StatusCodes.BAD_REQUEST, "MISSING_EMAIL");
        }
        await authService.resendVerification(email);
        return sendSuccess(res, null, "Verification email resent successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    verifyEmail,
    resendVerification,
}