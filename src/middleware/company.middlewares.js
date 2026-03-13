const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");

async function validateAddCompanies(req, res, next) {
    const { name, logoPath } = req.body;

    if(!name) {
        throw new AppError(
            "Company name is required",
            StatusCodes.BAD_REQUEST,
            "EMAIL_REQUIRED"
        );
    }

    if(!logoPath) {
        throw new AppError(
            "Company logo path is required",
            StatusCodes.BAD_REQUEST,
            "LOGO_PATH_REQUIRED"
        );
    }
}

module.exports = {
    validateAddCompanies,
}