import { PUBLIC_API_URL } from "$env/static/public";
import { myFetch } from "$lib/apis/myFetch.js";


const getPosts = async (communityId) => {
    const posts = await myFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts`);
    return posts;
};

const getPost = async (communityId, postId) => {
    const post = await myFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`);
    return post;
};

const createPost = async (communityId, post) => {
    const newPost = await myFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts`, {
        headers: { "Content-Type":"application/json", },
        method: "POST",
        body: JSON.stringify(post),
    });
    return newPost;
};

const deletePost = async (communityId, postId) => {
    const deletedPost = await myFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`, {
        method: "DELETE",
    });
    return deletedPost;
};

export { getPost, getPosts, createPost, deletePost };