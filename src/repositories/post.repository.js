const { Op } = require("sequelize");
const CrudRepository = require("./crud.repository");
const { Post, User, Company, Comment, Vote } = require("../models");

class PostRepository extends CrudRepository {
    constructor() {
        super(Post);
    }

    async findPosts(cursor, userId) {
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
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id"]
                },
                {
                    model: Vote,
                    as: "votes",
                    required: false,
                    where: userId ? { userId } : { id: -1 } // id: -1 will exclude all if no userId
                }
            ],
            limit,
        });

        const response = posts.map(post => ({
           ...post.toJSON(),
           displayName: post.isAnonymous ? "Anonymous" : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.isAnonymous ? null : post.userId,
           upvotes: post.upVotes || 0,
           downvotes: post.downVotes || 0,
           commentsCount: post.comments ? post.comments.length : 0,
           hasLiked: post.votes && post.votes.length > 0
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

    async findPostsByUserId(userId, reqUserId) {
        const whereClause = {userId: userId};
        if (Number(userId) !== Number(reqUserId)) {
            whereClause.isAnonymous = false;
        }

        const posts = await Post.findAll({
            where: whereClause,
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
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id"]
                },
                {
                    model: Vote,
                    as: "votes",
                    required: false,
                    where: reqUserId ? { userId: reqUserId } : { id: -1 }
                }
            ]
        });
        const response = posts.map(post => ({
           ...post.toJSON(),
           displayName: post.isAnonymous ? "Anonymous" : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.isAnonymous ? null : post.userId,
           upvotes: post.upVotes || 0,
           downvotes: post.downVotes || 0,
           commentsCount: post.comments ? post.comments.length : 0,
           hasLiked: post.votes && post.votes.length > 0
        }));
        return response;
    }

    async findPostBySlug(slug, reqUserId) {
        const post = await Post.findOne({
            where: {
                slug: slug
            },
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
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id"]
                },
                {
                    model: Vote,
                    as: "votes",
                    required: false,
                    where: reqUserId ? { userId: reqUserId } : { id: -1 }
                }
            ],
        });

        const response = {
           ...post.toJSON(),
           displayName: post.isAnonymous ? "Anonymous" : post.user?.name,
           user: post.isAnonymous ? null : post.user,
           userId: post.isAnonymous ? null : post.userId,
           upvotes: post.upVotes || 0,
           downvotes: post.downVotes || 0,
           commentsCount: post.comments ? post.comments.length : 0,
           hasLiked: post.votes && post.votes.length > 0
        };
        return response;
    }

}

module.exports = PostRepository;