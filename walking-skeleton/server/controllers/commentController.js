import * as commentRepository from "../repositories/commentRepository.js";

const create = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId)){
        return c.json({error: "Invalid post id"}, 400);
    };
    const data = await c.req.json();
    if (!data.content){
        return c.json({error: "Missing required fields"}, 400);
    };
    const newComment = await commentRepository.create(communityId, postId, data);
    return c.json(newComment, 201);
};

const readAll = async (c) => {
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId)){
        return c.json({error: "Invalid post id"}, 400);
    };
    const comments = await commentRepository.findAll(postId);
    return c.json(comments);
};

const deleteById = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid communityv id"}, 400);
    };
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId)){
        return c.json({error: "Invalid post id"}, 400);
    };
    const commentId = Number(c.req.param("commentId"));
    if (!Number.isInteger(commentId)){
        return c.json({error: "Invalid comment id"}, 400);
    };
    const deletedComment = await commentRepository.deleteById(communityId, postId, commentId);
    if (!deletedComment){
        return c.json({error: "Comment not found"}, 404);
    };
    return c.json(deletedComment, 200);
};


export { create, readAll, deleteById };