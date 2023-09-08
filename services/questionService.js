import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${text})`;
};

const deleteQuestion = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${id}`;
    await sql`DELETE FROM question_answer_options WHERE question_id = ${id}`;
    await sql`DELETE FROM questions WHERE id = ${id}`;
};

const findQuestionById = async (id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return rows[0];
};

const listQuestions = async () => {
    return await sql`SELECT * FROM questions ORDER BY id`;
};

const listQuestionsForTopic = async (topicId) => {
    return sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const randomQuestion = async (topicId) => {
    return sql`SELECT q.id, COUNT(qao.id) FROM questions q
    LEFT JOIN question_answer_options qao 
    ON q.id = qao.question_id 
    WHERE q.topic_id = ${topicId}
    GROUP BY q.id
    HAVING count(qao.id) > 0`;
};


export { 
    addQuestion,
    deleteQuestion,
    findQuestionById,
    listQuestions,
    listQuestionsForTopic,
    randomQuestion
};