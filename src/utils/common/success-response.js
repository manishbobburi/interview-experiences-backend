const { StatusCodes } = require("http-status-codes");

function sendSuccess(res, data, message = "OK", status = StatusCodes.OK) {
    res.status(status).json({
            success: true,
            data,
            message,
        });
}

module.exports = sendSuccess;