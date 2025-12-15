const CrudRepository = require("./crud.repository");
const { Post } = require("../models");

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }
}

module.exports = PostRepository;