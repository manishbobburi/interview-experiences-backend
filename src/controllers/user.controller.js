const { StatusCodes } = require("http-status-codes");

const { userService } = require("../services");
const { sendSuccess } = require("../utils/common");

async function signUp(req, res, next) {
    try {
        const user = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.password,
        });
        return sendSuccess(res, user, "User signed up successfully", StatusCodes.CREATED);      
    } catch (err) {
        next(err);
    }
}

async function signIn(req, res, next) {
    try {
        const user = await userService.signIn({
            email: req.body.email,
            passwordHash: req.body.password,
        });
        return sendSuccess(res, user, "User signed in successfully", StatusCodes.CREATED);
    } catch (err) {
        next(err);
    }
}

async function getMe(req, res, next) {
    try {
        const user = await userService.getMe(req.user);
        return sendSuccess(res, user, "Fetched user successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    signUp,
    signIn,
    getMe,
}