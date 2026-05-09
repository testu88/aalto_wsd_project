import postgres from "postgres";

const sql = postgres();

const create = async (userId, communityId, post) => {
    const result = await sql`INSERT INTO posts (created_by, community_id, title, content) VALUES (${userId}, ${communityId}, ${post.title}, ${post.content}) RETURNING *;`;
    return result[0];
};

const findAll = async (communityId) => {
    return await sql`SELECT * FROM posts WHERE community_id = ${communityId};`;
};

const findById = async (communityId, postId) => {
    const result = await sql`SELECT * FROM posts WHERE community_id = ${communityId} AND id = ${postId};`;
    return result[0];
};

const deleteById = async (userId, communityId, postId) => {
    const result = await sql`DELETE FROM posts WHERE created_by = ${userId} AND community_id = ${communityId} AND id = ${postId} RETURNING *;`;
    return result[0];
};


export { create, findAll, findById, deleteById };
