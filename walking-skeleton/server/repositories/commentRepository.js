import postgres from "postgres";

const sql = postgres();

const create = async (userId, communityId, postId, comment) => {
    const result = await sql`INSERT INTO posts (created_by, community_id, parent_post_id, content) VALUES (${userId},  ${communityId}, ${postId}, ${comment.content}) RETURNING *; `;
    return result[0];
};

const findAll = async (parentPostId) => {
    return await sql`SELECT * FROM posts  WHERE parent_post_id = ${parentPostId};`;
};

const deleteById = async (userId, communityId, postId, commentId) => {
    const result = await sql`DELETE FROM posts WHERE created_by = ${userId} AND community_id = ${communityId} AND parent_post_id = ${postId} AND id = ${commentId} RETURNING *;`;
    return result[0];
};


export { create, findAll, deleteById };

