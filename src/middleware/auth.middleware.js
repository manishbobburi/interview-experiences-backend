const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");
const { userService } = require("../services");

function validateAuthRequest(req, res, next) {
    const { email, password } = req.body;

    if (!email) {
        throw new AppError(
            "Email is required",
            StatusCodes.BAD_REQUEST,
            "EMAIL_REQUIRED"
        );
    }

    if (!password) {
        throw new AppError(
            "Password is required",
            StatusCodes.BAD_REQUEST,
            "PASSWORD_REQUIRED"
        );
    }

    next();
}

async function checkAuth(req, res, next) {
    try {
        const token =
            req.headers["x-access-token"] ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new AppError(
                "Authentication token missing",
                StatusCodes.BAD_REQUEST,
                "TOKEN_MISSING"
            );
        }

        const userId = await userService.isAuthenticated(token);
        req.user = userId;

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateAuthRequest,
    checkAuth,
};
