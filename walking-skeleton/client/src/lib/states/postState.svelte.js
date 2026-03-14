let postState = $state({
  1: [
    { id: 1, title: "OOP with JavaScript" },
  ],
  2: [
    { id: 1, title: "You all know exactly who I am", content: "Say my name" },
    { id: 2, title: "He told me you .... him", content: "No, I am your father" },
    { id: 3, title: "Do not cite the deep magic to me, Witch", content: "I was there when it was written." },
  ],
});


const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        getPost: (communityId, postId) => {
            return postState[communityId].find((p) => p.id === postId);
        },
        addPost: (communityId, title, content) => {
            postState[communityId].push({
                id: postState[communityId].length +1,
                title: title,
                content: content
            });
        },
        removePost: (communityId, postId) => {
            console.log("Before remove post:", postState[communityId]);
            postState[communityId] = postState[communityId].filter((p) => p.id !== postId);
            console.log("After removing post:", postState[communityId]);
        },
    };
};

export { usePostState };