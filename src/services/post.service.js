const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");
const { PostRepository } = require("../repositories");

const postRepository = new PostRepository();

async function createPost(data) {
    const response = await postRepository.create(data);
    return response;
}

async function getPost(id) {
    const response = await postRepository.get(id);
    return response;
}

async function getAllPosts() {
    const response = await postRepository.getAll();
    return response;
}

async function deletePost(id) {
    const response = await postRepository.destroy(id);
    return response;
}

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    deletePost,
}