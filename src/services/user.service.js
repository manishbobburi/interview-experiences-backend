const { StatusCodes } = require("http-status-codes");

const { AppError } = require("../utils/error");
const { UserRepository } = require("../repositories");
const { Auth } = require("../utils/common");

const userRepository = new UserRepository();

async function signUp(data) {
    try {
        return await userRepository.create(data);
    } catch (err) {
        if (
            err.name === "SequelizeValidationError" ||
            err.name === "SequelizeUniqueConstraintError"
        ) {
            throw new AppError(
                err.errors.map(e => e.message),
                StatusCodes.BAD_REQUEST,
                "VALIDATION_ERROR"
            );
        }

        throw new AppError(
            "Failed to create user",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


async function signIn({ email, passwordHash }) {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new AppError(
            "User not found",
            StatusCodes.NOT_FOUND,
            "USER_NOT_FOUND"
        );
    }

    const isValid = Auth.checkPassword(passwordHash, user.passwordHash);
    if (!isValid) {
        throw new AppError(
            "Invalid password",
            StatusCodes.UNAUTHORIZED,
            "INVALID_CREDENTIALS"
        );
    }

    const token = Auth.createToken({ id: user.id, email: user.email });

    const { password: _, createdAt, updatedAt, ...safeUser } =
        user.dataValues;

    return {
        ...safeUser,
        jwt: token,
    };
}


async function isAuthenticated(token) {
    if (!token) {
        throw new AppError(
            "JWT token missing",
            StatusCodes.BAD_REQUEST,
            "TOKEN_MISSING"
        );
    }

    let payload;
    try {
        payload = Auth.verifyToken(token);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new AppError(
                "JWT token expired",
                StatusCodes.UNAUTHORIZED,
                "TOKEN_EXPIRED"
            );
        }

        throw new AppError(
            "Invalid JWT token",
            StatusCodes.UNAUTHORIZED,
            "INVALID_TOKEN"
        );
    }

    const user = await userRepository.get(payload.id);
    if (!user) {
        throw new AppError(
            "User not found",
            StatusCodes.NOT_FOUND,
            "USER_NOT_FOUND"
        );
    }

    return user.id;
}


module.exports = {
    signUp,
    signIn,
    isAuthenticated,
}