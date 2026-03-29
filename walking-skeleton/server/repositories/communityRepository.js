import postgres from "postgres";

const sql = postgres();

// Repository Design Pattern
const create = async (community) => {
    const result = await sql`INSERT INTO communities (name, description) VALUES (${community.name}, ${community.description}) RETURNING *;`;
    return result[0];
};

const findAll = async () => {
    return await sql`SELECT * FROM communities;`;
   
};

const findById = async (id) => {
    const result = await sql`SELECT * FROM communities WHERE id=${id};`;
    return result[0];
};

const deleteById = async (id) => {
    const result = await sql`DELETE FROM communities WHERE id = ${id} RETURNING *;`;
    return result[0];
};


export { create, findAll, findById, deleteById};