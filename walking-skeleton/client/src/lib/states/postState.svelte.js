import { browser } from "$app/environment";
import { myFetch } from "$lib/apis/myFetch";
import * as postsApi from "$lib/apis/postsApi.js";


let postState = $state({});

/*let postState = $state({
  1: [
    { id: 1, title: "OOP with JavaScript" },
  ],
  2: [
    { id: 1, title: "You all know exactly who I am", content: "Say my name" },
    { id: 2, title: "He told me you .... him", content: "No, I am your father" },
    { id: 3, title: "Do not cite the deep magic to me, Witch", content: "I was there when it was written." },
  ],
});*/

const initPosts = async (communityId) => {
    if (browser) {
        const posts = await postsApi.getPosts(communityId);
        if (posts.error) return;
        postState[communityId] = posts.data;
    };
};

const initPost = async (communityId, postId) => {
    if (browser) {
        const post = await postsApi.getPost(communityId, postId);
        if (post.error) return;
        if (post.data && !postState[communityId].find((p) => p.id === postId)){
            postState[communityId].push(post.data);
        };
    };
};

const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        addPost: async (communityId, post) => {
            post.community_id = communityId;
            post.parent_post_id = null;
            console.log("new Post:", post);
           const newPost = await postsApi.createPost(communityId, post);
           if (newPost.error){
            console.error(newPost.error);
            return;
           };
           const posts = postState[communityId] || [];
           posts.push(newPost);
           postState[communityId] = posts;
           
        },
        removePost: async (communityId, postId) => {
           const deletedPost = await postsApi.deletePost(communityId, postId);
           if (deletedPost.error){
            console.error(deletedPost.error);
            return;
           };
           const index = postState[communityId].findIndex((p) => p.id === postId);
           if (index !== -1){
            postState[communityId].splice(index, 1);
           };
        },
    };
};

export { initPost, initPosts, usePostState };