const generateSlug = require("../utils/common/slug")
const { PostRepository, CompanyRepository } = require("../repositories");
const { AppError } = require("../utils/error");
const { StatusCodes } = require("http-status-codes");

const postRepository = new PostRepository();
const companyRepository = new CompanyRepository();

async function createPost(data) {
    const company = await companyRepository.get(data.companyId);

    const slug = generateSlug(company.name, data.role);

    const postData = {
        ...data,
        slug,
    };

    const response = await postRepository.create(postData);
    return response;
}

async function getPost(slug, userId) {
    const response = await postRepository.findPostBySlug(slug, userId);
    return response;
}

async function getPostsByUserId(userId, reqUserId) {
    const response = await postRepository.findPostsByUserId(userId, reqUserId);
    return response;
}

async function getAllPosts(cursor, userId) {
    const response = await postRepository.findPosts(cursor, userId);
    return response;
}

async function deletePost(id, reqUser) {
    const post = await postRepository.get(id);

    if (post.userId !== reqUser.id && reqUser.role?.name !== 'ADMIN') {
        throw new AppError("Forbidden: You do not have permission to delete this post", StatusCodes.FORBIDDEN);
    }

    const response = await postRepository.destroy(id);
    return response;
}

module.exports = {
    createPost,
    getPost,
    getPostsByUserId,
    getAllPosts,
    deletePost,
}