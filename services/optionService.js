import { sql } from "../database/database.js";

const addOption = async (questionId, text, isCorrect) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionId}, ${text}, ${isCorrect})`;
};

const deleteOption = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${id}`;
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const findCorrectOptionForQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = true`;
};

const findOptionById = async (id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
    return rows[0];
};

const listOptionsForQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const listOptionsForQuestionApi = async (questionId) => {
    return await sql`SELECT id AS "optionId", option_text AS "optionText" FROM question_answer_options WHERE question_id = ${questionId}`;
};

export {
    addOption,
    deleteOption,
    findCorrectOptionForQuestion,
    findOptionById,
    listOptionsForQuestion,
    listOptionsForQuestionApi,
};