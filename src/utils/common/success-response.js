const { StatusCodes } = require("http-status-codes");

function sendSuccess(res, data, message = "Request successful", status = StatusCodes.OK) {
    if (status < 200 || status >= 300) {
        throw new Error("sendSuccess requires a 2xx status code");
    }

    res.status(status).json({
            success: true,
            data,
            message,
    });
}

module.exports = sendSuccess;