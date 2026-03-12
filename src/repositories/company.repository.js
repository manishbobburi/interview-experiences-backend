const CrudRepository = require("./crud.repository");
const { Company } = require("../models");

class CompanyRepository extends CrudRepository {
    constructor() {
        super(Company);
    }

    async getAllSortedByName() {
        return await Company.findAll({
        order: [['name', 'ASC']],
        raw: true
        });
    }
}

module.exports = CompanyRepository;