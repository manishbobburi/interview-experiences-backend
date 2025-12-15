const CrudRepository = require("./crud.repository");
const { Vote } = require("../models");

class VoteRepository extends CrudRepository {
    constructor() {
        super(Vote);
    }
}

module.exports = VoteRepository;