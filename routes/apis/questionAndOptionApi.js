import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const listQuestionsWithOptions = async ({ response }) => {
    const questions = await questionService.listQuestions();

    if (questions.length > 0) {
        const index = Math.floor(Math.random() * questions.length);

        const question = questions[index];

        const res = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: await optionService.listOptionsForQuestionApi(question.id),
        };

        response.body = res;
    } else {
        response.body = {};
    }
};

const answerQuestion = async ({ request, response }) => {
    const body = request.body({type: "json"});
    const document = await body.value;

    if (document.questionId && document.optionId) {
        const rows = await optionService.findCorrectOptionForQuestion(Number(document.questionId));


        const correctOption = rows[0];
        if (correctOption && (Number(correctOption.id) === Number(document.optionId))) {
            response.body = { correct: true };
        } else {
            response.body = { correct: false };
        }
    }
};

export { 
    answerQuestion,
    listQuestionsWithOptions 
};