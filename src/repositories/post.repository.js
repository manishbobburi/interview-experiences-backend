const CrudRepository = require("./crud.repository");
const { Post, User } = require("../models");

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }

    async findPosts() {
        const posts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                }
            ]
        });

        const response = posts.map(post => ({
           ...post.toJSON(),
           displayName: post.isAnonymous ? 'Anonymous' : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.isAnonymous ? null : post.userId,
        }));

        return response;
    }
    async findPostsByUserId(userId) {
        const posts = await Post.findAll({
            where: {userId: userId},
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                }
            ]
        });
        return posts;
    }
}

module.exports = PostRepository;