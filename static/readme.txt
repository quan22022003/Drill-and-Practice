# Shared Shopping Lists Web Application

This repository contains a web application designed for managing shared shopping lists. Users can create shopping lists, add items to them, mark items as collected, and deactivate shopping lists as needed.

## Project Overview

The project follows a three-tier architecture (client, server, database) and is organized using a layered architecture with four distinct layers: views, controllers, services, and database.

- The main application code resides in the `shopping-lists` folder.
- Database schema initialization scripts can be found in `flyway/sql`.
- Entry point to the application is `app.js`.
- Dependency definitions are managed in `deps.js`.

## Usage

1. Clone this repository to your local machine.
2. Navigate to the `shopping-lists` folder.
3. Execute `docker-compose up` to launch the application.
4. Access the application via your web browser at [http://localhost:7777](http://localhost:7777).

## Application Features

### Main Page

- The main page provides statistics about the application's usage.
- Access the main page at [http://localhost:7777](http://localhost:7777).

### Shopping Lists

- Create new shopping lists using a simple form.
- Deactivate shopping lists by clicking the "Deactivate list!" button.
- Browse and interact with active shopping lists and their respective items.

### Individual Shopping Lists

- View and manage items within each shopping list.
- Add items to shopping lists via a user-friendly form.
- Mark items as collected when needed.
- Collected items are displayed with a strikethrough.

### Statistics

- The main page displays the total count of shopping lists and items.
- If no shopping lists exist, a message "No shopping lists yet." is shown.

### Automated Tests

- A suite of end-to-end tests is provided to ensure functionality.

## Deployment

The application has been successfully deployed to an online location for convenient access. You can experience the application firsthand at [Online Deployment Link](https://shopping-lists-cua-quan.onrender.com/).
For local testing, follow the "Usage" instructions above.

## Sidenotes

- Redirects adhere to the status code 303.
- Views maintain a separate folder structure and leverage layouts for consistent design.
- Detailed documentation is embedded in this README.md file.

## License

This project is licensed under the [MIT License](LICENSE).