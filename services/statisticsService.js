import { sql } from "../database/database.js";

const countAnswers = async () => {
    const rows = await sql`SELECT count(*) as count FROM question_answers`;

    if (rows && rows[0] && rows[0].count) {
        return rows[0].count;
    }
    
    return 0;
};

const countQuestions = async () => {
    const rows = await sql`SELECT count(*) as count FROM questions`;

    if (rows && rows[0] && rows[0].count) {
        return rows[0].count;
    }
    return 0;
};

const countTopics = async () => {
    const rows = await sql`SELECT count(*) as count FROM topics`;

    if (rows && rows[0] && rows[0].count) {
        return rows[0].count;
    }
    return 0;
};

export {
    countAnswers,
    countQuestions,
    countTopics
};