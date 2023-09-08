import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as api from "./apis/questionAndOptionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.post("/topics", topicController.addTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:id/questions", questionController.addQuestion);

router.get("/topics/:id/questions/:qId", optionController.listOptions);
router.post("/topics/:id/questions/:qId/options/:oId/delete", optionController.deleteOption);
router.post("/topics/:id/questions/:qId/options", optionController.addOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:id", quizController.redirectToQuiz);
router.get("/quiz/:id/questions/:qId", quizController.randomQuestion);
router.post("/quiz/:id/questions/:qId/options/:oId", quizController.redirectToCorrectness);
router.get("/quiz/:id/questions/:qId/correct", quizController.showCorrectness);
router.get("/quiz/:id/questions/:qId/incorrect", quizController.showCorrectness);

router.get("/api/questions/random", api.listQuestionsWithOptions);
router.post("/api/questions/answer", api.answerQuestion);

export { router };
