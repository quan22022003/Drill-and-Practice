import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const listTopics = async ({ render }) => {
    const data = {
        topics: await topicService.listTopics(),
    };
    render("quiz.eta", data);
};

const randomQuestion = async ({ render, params }) => {
    const data = {
        question: await questionService.findQuestionById(params.qId),
        options: await optionService.listOptionsForQuestion(params.qId),
        topicid: params.id,
        questionid: params.qId,
    };
    render("randomQuestion.eta", data);
};

const redirectToCorrectness = async ({ response, params, user }) => {
    const option = await optionService.findOptionById(params.oId);

    await questionAnswerService.addAnswer(user.id, params.qId, params.oId);

    if (option.is_correct) {
        response.redirect(`/quiz/${params.id}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/questions/${params.qId}/incorrect`);
    }
};

const redirectToQuiz = async ({ render, params, response }) => {
    const rows = await questionService.randomQuestion(params.id);
    
    if (rows.length === 0) {
        const data = {
            errors: ["There are no questions so far for the topic."],
        };
        render("randomQuestion.eta", data);
        return;
    } else {
        const index = Math.floor(Math.random() * rows.length);
        const randomQuestion = rows[index];
        response.redirect(`/quiz/${params.id}/questions/${randomQuestion.id}`);
    };
};

const showCorrectness = async ({ render, request, params }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (!pathname.endsWith("/correct")) {
        const rows = await optionService.findCorrectOptionForQuestion(params.qId);
        const data = {
            correct_option: rows[0],
            topicid: params.id,
        }
        render("correctness.eta", data);
    } else {
        render("correctness.eta", { 
            correctness: true,
            topicid: params.id,
        });
    }
};



export { 
    listTopics, 
    randomQuestion,
    redirectToCorrectness,
    redirectToQuiz,
    showCorrectness,
};