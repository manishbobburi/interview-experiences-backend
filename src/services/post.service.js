const generateSlug = require("../utils/common/slug")
const { PostRepository, CompanyRepository } = require("../repositories");

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

async function getPost(slug) {
    const response = await postRepository.findPostBySlug(slug);
    return response;
}

async function getPostsByUserId(userId) {
    const response = await postRepository.findPostsByUserId(userId);
    return response;
}

async function getAllPosts(cursor) {
    const response = await postRepository.findPosts(cursor);
    return response;
}

async function deletePost(id) {
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