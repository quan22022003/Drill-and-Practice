import { sql } from "../database/database.js";

const createTopic = async (userId, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
    await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
    await sql`DELETE FROM questions WHERE topic_id = ${id}`;
    await sql`DELETE FROM topics WHERE id = ${id}`;
};

const listTopics = async () => {
    return await sql`SELECT * FROM topics 
                    ORDER BY name`;
};

export { 
    createTopic, 
    deleteTopic, 
    listTopics 
};