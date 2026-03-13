const { Op } = require("sequelize");
const CrudRepository = require("./crud.repository");
const { Post, User, Company } = require("../models");

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }

    async findPosts(cursor) {
        const limit = 20;

        const where = cursor
         ? {
            [Op.or]: [
                { createdAt: { [Op.lt]: cursor.createdAt } },
                {
                    createdAt: cursor.createdAt,
                    id: { [Op.lt]: cursor.id },
                },
            ],
         } 
        : {};

        const posts = await Post.findAll({
            where,
            order: [
                ["createdAt", "DESC"],
                ["id", "DESC"]
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name"],
                },
                {
                    model: Company,
                    as: "company",
                    attributes: ["id", "name", "logoPath"],
                }
            ],
            limit,
        });

        const response = posts.map(post => ({
           ...post.toJSON(),
           displayName: post.isAnonymous ? "Anonymous" : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.isAnonymous ? null : post.userId,
        }));

        const nextCursor = 
        posts.length === limit
        ? {
            createdAt: posts[posts.length - 1].createdAt,
            id: posts[posts.length - 1].id,
        }
        : null;

        return { 
            items: response,
            nextCursor,
            hasMore: nextCursor !== null
        };
    }

    async findPostsByUserId(userId) {
        const posts = await Post.findAll({
            where: {userId: userId},
            order: [
                ["createdAt", "DESC"]
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name"],
                },
                {
                    model: Company,
                    as: "company",
                    attributes: ["id", "name", "logoPath"],
                }
            ]
        });
        const response = posts.map(post => ({
           ...post.toJSON(),
           displayName: post.isAnonymous ? "Anonymous" : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.userId,
        }));
        return response;
    }

    async findPostById(userId) {
        const post = await Post.findByPk(
            userId, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["name"],
                },
                {
                    model: Company,
                    as: "company",
                    attributes: ["id", "name", "logoPath"],
                }
            ],
        });

        const response = {
           ...post.toJSON(),
           displayName: post.isAnonymous ? "Anonymous" : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.isAnonymous ? null : post.userId,
        };
        return response;
    }

}

module.exports = PostRepository;