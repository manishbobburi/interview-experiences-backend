const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next) {
    const statusCode = 
        Number.isInteger(err.statusCode) && err.statusCode >= 400
            ? err.statusCode
            : StatusCodes.INTERNAL_SERVER_ERROR;

    const message =
        typeof err.message === "string"
            ? err.message
            : "Something went wrong";

    if (process.env.NODE_ENV !== "test") {
        console.error(err.stack);
    }

    res.status(statusCode).json({
            success: false,
            error: {
                code: err.code || "INTERNAL_ERROR",
                message,
            },
        });
}

module.exports = errorHandler;