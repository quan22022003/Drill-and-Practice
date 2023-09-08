import * as topicService from "../../services/topicService.js";
import * as validationRules from "../../validation/validationRules.js";
import { validasaur } from "../../deps.js";

const addTopic = async ({ render, request, response, user }) => {
    const body = request.body({ type: "form"});
    const params = await body.value;

    const topicData = {
        name: params.get("name"),
        admin: user.admin,
    };

    const [passes, errors] = await validasaur.validate(
        topicData,
        validationRules.topicValidationRules,
    );

    if (!passes) {
        console.log(errors);
        topicData.validationErrors = errors;
        topicData.topics = await topicService.listTopics();
        render("topic.eta", topicData);
    } else {
        await topicService.createTopic(user.id, topicData.name);
        response.redirect("/topics");
    }
};

const deleteTopic = async ({ params, response, user }) => {
    if (user.admin) {
        await topicService.deleteTopic(params.id);
    } else {
        console.log("Only admin can delete topics!");
    }
    response.redirect("/topics");
};

const listTopics = async ({ render }) => {
    const data = {
        topics: await topicService.listTopics(),
    };
    render("topic.eta", data);
};

export {
    addTopic,
    deleteTopic,
    listTopics,
};