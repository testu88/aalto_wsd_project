import { browser } from "$app/environment";
import { myFetch } from "$lib/apis/myFetch.js";
import * as commentsApi from "$lib/apis/commentsApi.js";

let commentState = $state({});

const initComments = async (communityId, postId) => {
    if (browser){
        const comments = await commentsApi.getComments(communityId, postId);
        console.log("Client comments:", comments);
        if (comments.error){
            return;
        };
        commentState[postId] = comments.data;
    };
};


const useCommentState = () => {
    return { 
        get comments() {
            return commentState;
        },
        addComment: async(communityId, postId, comment) => {
            comment.id = commentState[postId].length += 1;
            comment.community_id = communityId;
            comment.parent_post_id = postId;
            comment.title = null;
            comment.created_on = new Date().toISOString();
            
            const newComment = await commentsApi.createComment(communityId, postId, comment);
            if (newComment.error) return ;
            const comments = commentState[postId] || [];
            commentState[postId] = [...comments, newComment.data];
        },
        removeComment: async (communityId, postId, commentId) => {
            const deletedComment = await commentsApi.deleteComment(communityId, postId, commentId);
            if (deletedComment.error) return;
            const index = commentState[postId].findIndex((c) => c.id === commentId);
            if (index !== -1){
                commentState[postId].splice(index, 1);
            };
        },
    };
};

export { initComments, useCommentState };