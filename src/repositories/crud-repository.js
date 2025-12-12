
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async  create(data) {
        const response = this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = this.model.delete(Types.ObjectId(id));
        return response;
    }

    async get(id) {
        const response = this.model.find
    }
}

module.exports = CrudRepository;