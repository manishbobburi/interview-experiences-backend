const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");

async function validateAddCompanies(req, res, next) {
    const { name, logoUrl } = req.body;

    if(!name) {
        throw new AppError(
            "Company name is required",
            StatusCodes.BAD_REQUEST,
            "EMAIL_REQUIRED"
        );
    }

    if(!logoUrl) {
        throw new AppError(
            "Company logo URL is required",
            StatusCodes.BAD_REQUEST,
            "EMAIL_REQUIRED"
        );
    }
}

module.exports = {
    validateAddCompanies,
}