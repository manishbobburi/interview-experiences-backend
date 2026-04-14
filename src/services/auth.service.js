const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");
const { UserRepository } = require("../repositories");
const { RedisConfig: { redisClient } } = require("../config");
const { sendToken } = require("./token.service");

const userRepository = new UserRepository();

async function verifyEmail(inputToken) {
    const email = await redisClient.get(`verify:${inputToken}`);
    
    if(!email) {
        throw new AppError("The provided verification token is invalid or has expired.", StatusCodes.BAD_REQUEST, "TOKEN_NOT_FOUND_OR_EXPIRED");
    }
    
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND, "USER_NOT_FOUND");
    }

    if (user.verified) {
        return { message: "This email address is already verified" };
    }
    
    await userRepository.update(user.id, { verified: true});
    await redisClient.del(`verify:${inputToken}`);
    await redisClient.del(`verify_email:${email}`);

    return true;
}

async function resendVerification(email) {
    const userResult = await userRepository.getUserByEmail(email);
    if (!userResult) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND, "USER_NOT_FOUND");
    }
    
    const user = userResult.dataValues;

    if (user.verified) {
        throw new AppError("Email is already verified", StatusCodes.BAD_REQUEST, "EMAIL_ALREADY_VERIFIED");
    }
    
    await sendToken(user.email);
    return true;
}

module.exports = {
    verifyEmail,
    resendVerification,
}