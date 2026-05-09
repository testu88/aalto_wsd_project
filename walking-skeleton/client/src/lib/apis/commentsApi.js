import { PUBLIC_API_URL } from "$env/static/public";
import { myFetch } from "./myFetch.js";
import { authFetch } from "$lib/utils/fetchUtils.js";


const getComments = async (communityId, postId) => {
    const comments = await myFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`);
    if (comments.error){
        return;
    };
    return comments;
};

const createComment = async (communityId, postId, comment) => {
    const newComment = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`, {
        headers: { "Content-Type":"application/json", },
        method: "POST",
        body: JSON.stringify(comment),
    });
    return newComment;
};

const deleteComment = async (communityId, postId, commentId) => {
    const deletedComment = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
    });
    return deletedComment;
};

export { getComments, createComment, deleteComment };