import postgres from "postgres";

const sql = postgres();

// Repository Design Pattern
const create = async (userId, community) => {
    const result = await sql`INSERT INTO communities (created_by, name, description) VALUES (${userId}, ${community.name}, ${community.description}) RETURNING *;`;
    return result[0];
};

const findAll = async () => {
    return await sql`SELECT * FROM communities;`;
   
};

const findById = async (id) => {
    const result = await sql`SELECT * FROM communities WHERE id=${id};`;
    return result[0];
};

const deleteById = async (userId, id) => {
    const result = await sql`DELETE FROM communities WHERE created_by = ${userId} AND id = ${id} RETURNING *;`;
    return result[0];
};


export { create, findAll, findById, deleteById};