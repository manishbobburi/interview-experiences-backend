const CrudRepository = require("./crud.repository");
const { Post } = require("../models");

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }

    async findPosts() {
        const posts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return posts;
    }
    async findPostsByUserId(userId) {
        const posts = await Post.findAll({
            where: {userId: userId},
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return posts;
    }
}

module.exports = PostRepository;