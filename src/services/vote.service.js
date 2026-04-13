const { VoteRepository, PostRepository } = require("../repositories");

const voteRepository = new VoteRepository();
const postRepository = new PostRepository();

async function toggleLike(data) {
    const existingVote = await voteRepository.model.findOne({
        where: { userId: data.userId, postId: data.postId }
    });

    if (existingVote) {
        await voteRepository.model.destroy({ where: { id: existingVote.id } });
        await postRepository.model.decrement("upVotes", { by: 1, where: { id: data.postId } });
        return { liked: false };
    } else {
        await voteRepository.model.create({ userId: data.userId, postId: data.postId, vote: 1 });
        await postRepository.model.increment("upVotes", { by: 1, where: { id: data.postId } });
        return { liked: true };
    }
}

module.exports = {
    toggleLike,
}