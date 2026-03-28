const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");
const { ServerConfig, RabbitMQ, RedisConfig: { redisClient } } = require("../config");
const generateVerificationToken = require("../utils/common/generateVerificationToken");

async function sendToken(email) {
    const oldToken = await redisClient.get(`verify_email:${email}`);
    if (oldToken) {
        await redisClient.del(`verify:${oldToken}`);
    }

    const token = await generateVerificationToken();

    await redisClient.set(`verify:${token}`, email, {
        EX: ServerConfig.VERIFICATION_TOKEN_EXPIRY
    });

    await redisClient.set(`verify_email:${email}`, token, {
        EX: ServerConfig.VERIFICATION_TOKEN_EXPIRY
    });

    try {
        await RabbitMQ.publish('email_verification', {
            to: email,
            subject: 'Verify your email',
            token: token,
        });
        return true;
    } catch (queueError) {
        console.error('Message queue dispatch failed:', queueError);
        throw new AppError("Unable to dispatch verification email at this time. Please try again later.", StatusCodes.INTERNAL_SERVER_ERROR, "QUEUE_CONNECTION_FAILED");
    }
}

module.exports = {
    sendToken,
}