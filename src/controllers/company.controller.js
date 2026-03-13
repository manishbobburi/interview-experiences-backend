const { StatusCodes } = require("http-status-codes");

const { companyService } = require("../services");
const { sendSuccess } = require("../utils/common");


async function getCompanies(req, res, next) {
    try {
        const response = await companyService.getCompanies();

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

async function addCompanies(req, res, next) {
    try {
        const response = await companyService.addCompanies(req.body);

        return sendSuccess(
            res,
            response,
            "Companies added successfully",
            StatusCodes.CREATED
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCompanies,
    addCompanies,
}