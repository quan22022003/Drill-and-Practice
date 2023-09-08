import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";
import * as validationRules from "../../validation/validationRules.js";

const addOption = async ({ params, render, request, response }) => {
    const body = request.body({type: "form"});
    const value = await body.value;

    const optionData = {
        option_text: value.get("option_text"),
        is_correct: Boolean(value.get("is_correct")),
    };

    const [passes, errors] = await validasaur.validate(
        optionData,
        validationRules.optionValidationRules,
    );

    const rows = await optionService.findCorrectOptionForQuestion(params.qId);
    const isNotTheFirstCorrectOption = optionData.is_correct && rows.length >= 1;

    if (!passes | isNotTheFirstCorrectOption) {
        console.log(errors);

        optionData.validationErrors = errors;
        optionData.question = await questionService.findQuestionById(params.qId);
        optionData.topicid = params.id;
        optionData.questionid = params.qId;
        optionData.options = await optionService.listOptionsForQuestion(params.qId);

        if (isNotTheFirstCorrectOption) {
            optionData.correctnessError = "The question already has one correct option.";
        }

        render("option.eta", optionData);
    } else {
        await optionService.addOption(params.qId, optionData.option_text, optionData.is_correct);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

const listOptions = async({ params, render }) => {
    const data = {
        question: await questionService.findQuestionById(params.qId),
        options: await optionService.listOptionsForQuestion(params.qId),
        topicid: params.id,
        questionid: params.qId,
    };
    render("option.eta", data);
};

const deleteOption = async ({ params, response }) => {
    await optionService.deleteOption(params.oId);
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

export {
    addOption,
    deleteOption,
    listOptions,
};