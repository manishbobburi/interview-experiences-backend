const { StatusCodes } = require("http-status-codes");
const  { AppError } = require("../utils/error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async  create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id,
            }
        });

        if(response === 0) {
            throw new AppError("No data found with given id.", StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data);

        if(!response) {
            throw new AppError("No data found.", StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const [updatedCount] = await this.model.update(data, {
            where: {id},
        });

        if(updatedCount === 0) {
            throw new AppError("No data found with given id.", StatusCodes.NOT_FOUND);
        }

        const updatedRecord = await this.model.findByPk(id);
        return updatedRecord;
    }
}

module.exports = CrudRepository;