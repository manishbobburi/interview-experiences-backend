const { StatusCodes } = require("http-status-codes");

const { companyService } = require("../services");
const { sendSuccess } = require("../utils/common");


async function getCompanies(req, res, next) {
    try {
        const response = await companyService.getCompanies(req.validatedBody);

        return sendSuccess(
            res,
            response,
            "Companies retrieved successfully",
            StatusCodes.CREATED
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCompanies,
}