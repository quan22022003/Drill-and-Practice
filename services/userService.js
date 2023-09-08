import { sql } from "../database/database.js";

const addUser = async (email, admin, password) => {
    await sql`INSERT INTO users (email, admin, password) VALUES (${email}, ${admin}, ${password})`;
};

const findUserByEmail = async (email) => {
    return await sql`SELECT * FROM users WHERE email = ${email}`;
};

export {
    addUser, 
    findUserByEmail
};