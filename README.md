# MarsAI — Backend

Backend application for **MarsAI**, a web platform created for an AI-generated film festival.

This project was developed as part of the **DWWM (Développeur Web et Web Mobile)** training at La Plateforme_, for a real-world client project.

## About the project

The MarsAI backend provides the API and server-side logic required by the application.

It is responsible for:

- Managing application data
- Providing REST API endpoints
- User authentication and authorization
- Managing user roles and permissions
- Managing films and related data
- Communicating with the database
- Handling requests and server-side validation

The backend communicates with the MarsAI frontend through a REST API.

## Technologies

- Node.js
- Express
- TypeScript
- MySQL
- REST API
- Git

Additional libraries and tools are used depending on the application's features.

## Getting started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- MySQL

### Installation

Clone the repository:

```bash
git clone https://github.com/dariaplishanova/MarsAI-Back.git
```

Navigate to the project:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root.

Example:

```env
PORT=chosen_port
DB_HOST=database_host
DB_USER=database_username
DB_PASSWORD=database_password
DB_NAME=database_name
DB_PORT=database_port
CORS_ORIGIN=http://...
FRONTEND_URL=http://...
JWT_SECRET=secret_key_to_define
CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret><your_cloud_name>
RESEND_API_KEY=your_key_here
```

> The required environment variables may vary depending on the configuration of the application.

> Do not commit sensitive information, passwords, API keys or JWT secrets to the repository.

### Run the application

Start the development server:

```bash
npm run dev
```

The API will be available at the local address and port configured for the application.

## API

The backend exposes REST API endpoints used by the MarsAI frontend.

The API handles operations related to authentication, users, films and other application features.

## Database

The application uses **MySQL** to store and manage application data.

The database configuration is provided through environment variables.

## Frontend

This repository contains the backend application for MarsAI.

The frontend is maintained in a separate repository.

**Frontend repository:**  
https://github.com/dariaplishanova/MarsAI-Front

## Project status

This project was developed as part of the DWWM training program for a real-world client project.

The backend is designed to work together with the MarsAI frontend and database.

## Author

**Daria Plishanova**

Developed as part of the DWWM training at **La Plateforme_**.
