const { VoteRepository } = require("../repositories");

const voteRepository = new VoteRepository();

async function upVote(data) {
    const response = await voteRepository.create(data);
    return response;
}

async function downVote(data) {
    const response = await voteRepository.create(data);
    return response;
}

async function removeVote(data) {
    const response = await voteRepository.destroy(data);
    return response;
}

module.exports = {
    upVote,
    downVote,
    removeVote,
}