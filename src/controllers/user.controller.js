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
        const user = await userService.getMe(req.userId);
        return sendSuccess(res, user, "Fetched user successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

async function updateUserDetails(req, res, next) {
    try {
        const updateFields = {};

        if (req.body.name !== undefined) {
            updateFields.name = req.body.name.trim();
        }

        if (req.body.email !== undefined) {
            updateFields.email = req.body.email.trim();
        }

        const response = await userService.updateUserDetails(req.userId, updateFields);
        return sendSuccess(res, response, "User details updated successfully", StatusCodes.OK);
    } catch (err) {
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Passwords required" });
        }

        const passwords = {
            oldPassword: oldPassword.trim(),
            newPassword: newPassword.trim(),
        };

        const response = await userService.changePassword(req.userId, passwords);
        return sendSuccess(res, response, "Password changed successfully", StatusCodes.OK);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    signUp,
    signIn,
    getMe,
    updateUserDetails,
    changePassword,
}