import { sql } from "../database/database.js";

const addAnswer = async (userId, questionId, question_answer_option_id) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${question_answer_option_id})`;
};


export { addAnswer };