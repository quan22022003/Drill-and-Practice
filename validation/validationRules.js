import { validasaur } from "../deps.js";

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
    is_correct: [validasaur.required, validasaur.isIn([true, false])],
};

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
    admin: [validasaur.isIn([true])],
};

const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
}

export {
    optionValidationRules,
    questionValidationRules,
    topicValidationRules,
    registrationValidationRules,
};