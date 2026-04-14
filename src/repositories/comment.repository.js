const CrudRepository = require("./crud.repository");
const { Comment, User } = require("../models");

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async getCommentsByPostId(postId) {
        return await Comment.findAll({
            where: { postId },
            include: [{ model: User, as: "user", attributes: ["name"] }],
            order: [["createdAt", "DESC"]]
        });
    }
}

module.exports = CommentRepository;