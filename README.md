# QUÝT LẸT APPLICATION README

## Overview

This README document provides essential information about the Web Software Development course project, which is a web application for practicing and managing multiple-choice questions. The application uses a three-tier architecture (client, server, database) and a layered architecture with four layers (views, controllers, services, database). It is built using Deno and Oak and is designed to facilitate learning through repeated practice of course material.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Application Structure](#application-structure)
3. [Main Page](#main-page)
4. [Navigation](#navigation)
5. [Listing Topics](#listing-topics)
6. [Creating and Removing Topics](#creating-and-removing-topics)
7. [Creating and Listing Questions for a Topic](#creating-and-listing-questions-for-a-topic)
8. [Viewing a Question and Adding Answer Options](#viewing-a-question-and-adding-answer-options)
9. [Removing Answer Options and Questions](#removing-answer-options-and-questions)
10. [Registration Functionality](#registration-functionality)
11. [Login Functionality](#login-functionality)
12. [Asking Questions](#asking-questions)
13. [API](#api)
14. [Access Control](#access-control)
15. [Styles](#styles)
16. [Specifics](#specifics)
17. [Documentation](#documentation)
18. [Testing](#testing)
19. [Running, Deployment, and Usability](#running-deployment-and-usability)

## Project Structure

- The project is returned as a zip file with the following structure:
  - `docker-compose.yml`: Used to launch the project.
  - `README.md`: Contains project documentation.
  - `drill-and-practice/`: Contains the application code.

## Application Structure

- The application follows a three-tier architecture.
- It uses a layered architecture with views, controllers, services, and a database.
- The main application code resides in the `drill-and-practice` folder.
- Database schema initialization scripts can be found in `flyway/sql`.
- The Oak Application is created in `app.js` and exported using `export { app };`.
- The application can be launched locally using `run-locally.js`.
- Dependencies are defined in `deps.js`.

## Main Page

- The main page of the application is available at the root path `/`.
- It contains a brief description of the application, application statistics, and links for registration and login.
- Application statistics show the total number of topics, questions, and question answers.

## Navigation

- The application has a navigation (e.g., a navbar) providing links to topics (`/topics`) and quizzes (`/quiz`).

## Listing Topics

- A GET request to `/topics` lists available topics in alphabetical order.
- Topics are clickable, leading to `/topics/:id` where `:id` refers to the topic's database ID.

## Creating and Removing Topics

- Admin users can add topics via a form at `/topics`.
- Admin users can delete topics by clicking "Delete" next to each topic.
- The server verifies that only admins can create and remove topics.

## Creating and Listing Questions for a Topic

- A GET request to `/topics/:id` lists questions for a specific topic.
- Users can add questions via a form at `/topics/:id/questions`.
- Questions are validated and stored in the database.

## Viewing a Question and Adding Answer Options

- `/topics/:id/questions/:qId` shows a question and allows adding answer options.
- Users can add answer options via a form.
- Answer options are validated and stored in the database.
- Users can remove answer options, and questions if needed.

## Registration Functionality

- `/auth/register` displays a registration form.
- User registration is validated on the server.
- Passwords are securely hashed using bcrypt.

## Login Functionality

- `/auth/login` displays a login form.
- User credentials are verified against the database.

## Asking Questions

- `/quiz` displays a list of topics.
- `/quiz/:tId` randomly selects a question for the chosen topic.
- Users answer questions and receive feedback.

## API

- The application provides an API for random questions and answers.
- `/api/questions/random` returns a randomly selected question.
- `/api/questions/answer` processes submitted answers.

## Access Control

- Only authorized users can access `/topics` and `/quiz`.
- Unauthorized users are redirected to `/auth/login`.

## Styles

- The application uses a CSS framework via a CDN.
- Styles are consistent throughout the application.

## Specifics

- Passwords are securely hashed and not stored in plaintext.
- Database credentials are not included in the submission.

## Testing

- The application includes at least ten meaningful automatic tests.
- HTTP interface testing can be run with the command `docker-compose run --rm drill-and-practice deno test --allow-all` in the folder with the file `docker-compose.yml`.
- End-to-end tests are located in `/e2e-playwright/tests/drill-and-practice.spec.js`. 

## Usage

1. Clone this repository to your local machine.
2. Navigate to the `shopping-lists` folder.
3. Execute `docker-compose up` to launch the application.
4. Access the application via your web browser at [http://localhost:7777](http://localhost:7777).

## Deployment

The application has been successfully deployed to an online location for convenient access. You can experience the application firsthand at [Online Deployment Link](https://quyt-let-application.onrender.com/).
For local testing, follow the "Usage" instructions above.