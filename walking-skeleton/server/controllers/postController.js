import * as postRepository from "../repositories/postRepository.js";

const create = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    const data = await c.req.json();
    if (!data.title || !data.content){
        return c.json({error: "Missing required fields"}, 400);
    };
    const newPost = await postRepository.create(communityId, data);
    return c.json(newPost, 201);
};

const readAll = async (c) => {
     const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    const communities = await postRepository.findAll(communityId);
    return c.json(communities);
};

const readById = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId)){
        return c.json({error: "Invalid post id"}, 400);
    };
    const post = await postRepository.findById(communityId, postId);
    if (!post){
        return c.json({error: "Post not found"}, 404);
    };
    return c.json(post, 200);
};

const deleteById = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)){
        return c.json({error: "Invalid community id"}, 400);
    };
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId)){
        return c.json({error: "Invalid post id"}, 400);
    };
    const deletedPost = await postRepository.deleteById(communityId, postId);
    if (!deletedPost) {
        return c.json({error: "Post not found"}, 404);
    };
    return c.json(deletedPost, 200);
};
 
export { create, readAll, readById ,deleteById };