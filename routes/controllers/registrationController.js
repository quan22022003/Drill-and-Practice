import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import * as validationRules from "../../validation/validationRules.js";

const registerUser = async ({ request, response, render }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const regData = {
        email: params.get("email"),
        password: params.get("password"),
    };

    const [passes, errors] = await validasaur.validate(
        regData,
        validationRules.registrationValidationRules,
    );

    if (!passes) {
        console.log(errors);

        regData.validationErrors = errors;
        render("registration.eta", regData);
    } else {
        await userService.addUser(
            params.get("email"),
            false,
            await bcrypt.hash(params.get("password")),
        );
        response.redirect("/auth/login");
    }
};

const showRegistrationForm = ({ render }) => {
    render("registration.eta");
};

export { registerUser, showRegistrationForm };