class AppError extends Error {
    constructor(message, statusCode, errorCode = "INTERNAL_ERROR", details = null) {
        super(message);

        this.statusCode = statusCode || 500;
        this.explanation = message;
        this.errorCode = errorCode;
        this.details = details

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;