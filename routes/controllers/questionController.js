import { validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js";
import * as validationRules from "../../validation/validationRules.js";

const addQuestion = async ({request, response, render, params, user}) => {
    const body = request.body({type: "form"});
    const value = await body.value;

    const questionData = {
        question_text: value.get("question_text"),
    };

    const [passes, errors] = await validasaur.validate(
        questionData,
        validationRules.questionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        questionData.questions = await questionService.listQuestionsForTopic(params.id),
        questionData.topicid = params.id,
        render("question.eta", questionData);
    } else {
        await questionService.addQuestion(user.id, params.id, questionData.question_text);
        response.redirect(`/topics/${params.id}`);
    }
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.id}`);
};

const listQuestions = async ({ render, params }) => {
    const data = {
        questions: await questionService.listQuestionsForTopic(params.id),
        topicid: params.id,
    };

    render("question.eta", data)
};

export {
    addQuestion,
    deleteQuestion,
    listQuestions,
};

