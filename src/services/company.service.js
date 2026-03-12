const { CompanyRepository } = require("../repositories");

const companyRepository = new CompanyRepository();

async function getCompanies() {
    const response = await companyRepository.getAllSortedByName();
    return response;
}

async function addCompanies(data) {
    const response = await companyRepository.create(data);
    return response;
}

module.exports = {
    getCompanies,
    addCompanies,
}