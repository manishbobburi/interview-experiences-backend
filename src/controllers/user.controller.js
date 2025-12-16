const { StatusCodes } = require("http-status-codes");

const { userService } = require("../services");
const { sendSuccess } = require("../utils/common")

async function createUser(req, res, next) {
    try {
        const user = await userService.createUser(req.body);

        return sendSuccess(
            res, 
            user, 
            "User created successfully", 
            StatusCodes.CREATED
        );      
    } catch (err) {
        next(err);
    }
}

async function getUser(req, res, next) {
    try {
        const user = await userService.getUser(req.params.id);

        return sendSuccess(
            res,
            user,
            "User created successfully",
            StatusCodes.OK
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    getUser,
}