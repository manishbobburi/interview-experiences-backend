const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");
const { UserRepository } = require("../repositories");

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const response = await userRepository.create(data);      
        return response;
    } 
    catch (error) {
        if(
            error.name == "SequelizeValidationError" ||
            error.name == "SequelizeUniqueConstraintError"
        ) {
            const explanation = error.errors.map((err) => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError(
            "Failed to create a new user.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getUser(id) {
    try {
        const response = await userRepository.get(id);
        return response;
    } catch (err) {
        if(err.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("User not found!!", err.statusCode);
        }

        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
}