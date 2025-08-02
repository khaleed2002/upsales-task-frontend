# Upsales Task Frontend

This is the frontend application for the Upsales task. It is built using modern web technologies and provides a user-friendly interface for managing entries.

## Features

-   Add, update, and delete entries.
-   Infinite scrolling for entries table.
-   Responsive design.

## Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v16 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setup Instructions

1.  **Clone the repository**

    ```bash
    git clone https://github.com/khaleed2002/upsales_task_frontend.git
    cd upsales_task_frontend
    ```

2.  **Install dependencies**

    ```bash
    yarn install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and configure it. You can use the provided `.env.example` file as a reference:

        ```bash
        cp .env.example .env
        ```

        - `PORT`: The port on which the frontend will run.
        - `API_URL`: The base URL for the backend API.

4.  **Start the development server**

    ```bash
    yarn dev
    ```

    The application will be available at `http://localhost:<PORT>`.

## Scripts

-   `yarn dev`: Start the development server.
-   `yarn build`: Build the application for production.
-   `yarn preview`: Preview the production build.
