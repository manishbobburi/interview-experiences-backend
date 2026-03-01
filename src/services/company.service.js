const { CompanyRepository } = require("../repositories");

const companyRepository = new CompanyRepository();

async function getCompanies() {
    const response = await companyRepository.getAll();
    return response;
}

module.exports = {
    getCompanies,
}