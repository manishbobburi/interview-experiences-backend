const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next) {
    const statusCode = Number.isInteger(err.statusCode) && err.statusCode >= 400 ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    
    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        code: err.errorCode || "INTERNAL_ERROR",
        details: err.details || null
    });
}

module.exports = errorHandler;