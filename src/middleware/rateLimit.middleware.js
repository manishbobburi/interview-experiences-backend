const rateLimit = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");

const resendVerificationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 requests per windowMs
    handler: (req, res, next) => {
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            message: "Too many verification emails requested from this IP, please try again after an hour. Check your spam folder.",
            code: "RATE_LIMIT_EXCEEDED"
        });
    }
});

module.exports = {
    resendVerificationLimiter
};
