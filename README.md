📝 Smart Note-Taking App
A full-stack web application for creating, managing, and enhancing notes with the power of AI.

This project is a complete note-taking solution that allows users to perform standard CRUD (Create, Read, Update, Delete) operations. It integrates with a large language model (LLM) to provide intelligent features like content summarization, title generation, and text elaboration, transforming a simple notepad into a powerful writing assistant.

## 📁 Project Structure

```
FinalProjectGroup43/
├── frontend/        # Frontend code (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   ├── src/
│   │   ├── script.js
│   │   └── server.js
├── backend/         # Backend code (Node.js, Express, MongoDB)
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── itemController.js
│   │   ├── models/
│   │   │   └── itemModel.js
│   │   └── routes/
│   │       └── itemRoute.js
├── README.md
```

✨ Features
Full CRUD Functionality: Create, read, update, and delete notes with ease.

AI-Powered Summarization: Instantly generate a concise summary of any long note with a single click.

AI Title Generation: Automatically create a relevant and short title for your note's content.

AI Content Elaboration: Expand on a simple idea or title to generate a full, well-written paragraph.

Tagging System: Organize your notes with comma-separated tags.

Live Search: Instantly filter notes by title or tags.

Responsive Design: A clean, intuitive, and responsive user interface that works on all devices.

🛠️ Tech Stack
Backend
Node.js: JavaScript runtime environment.

Express.js: Web framework for building the API.

MongoDB: NoSQL database for storing notes.

Mongoose: Object Data Modeling (ODM) library for MongoDB.

Google Gemini API: For all generative AI functionalities.

Frontend
HTML5

CSS3

Vanilla JavaScript (ES6+): For all client-side logic and DOM manipulation.

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js installed (which includes npm).

MongoDB Atlas account and a connection string.

A Google AI Studio API Key for the Gemini LLM.

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

Backend Setup:

Navigate to the backend directory:

cd backend

Install the required npm packages:

npm install

Create your environment file by copying the template:

cp .env.template .env

Open the newly created .env file and fill in your DATABASE_URL and LLM_API_KEY.

Start the backend server:

npm start

The server will be running on http://localhost:3222.

Frontend Setup:

No installation is needed for the frontend.

The easiest way to run the frontend is by using a live server extension. For example, in VS Code, right-click the frontend/index.html file and select "Open with Live Server".

The frontend will be accessible at http://localhost:3221 (or a similar port). The application is pre-configured to communicate with the backend running on port 3222.

## 🖥️ Usage

1. Start the backend server (see Backend Setup above).
2. Open the frontend (`frontend/index.html`) with a live server or browser.
3. Create, edit, and manage notes with AI-powered features.

📜 API Endpoints
The following are the API routes available on the backend:

Method

Endpoint

Description

POST

/api/notes

Create a new note with content.

POST

/api/notes/title-only

Create a new note with only a title.

GET

/api/notes

Get a list of all notes.

GET

/api/notes/:id

Get a single note by its ID.

PUT

/api/notes/:id

Update an existing note.

DELETE

/api/notes/:id

Delete a note.

POST

/api/notes/:id/summarize

Generate and save a summary for a note.

POST

/api/notes/:id/generate-title

Generate and save a title for a note.

POST

/api/notes/:id/elaborate

Generate and save elaborated content.

👥 Authors
This project was created by:
Kaweekorn Satjayan  -  6833007921
Kirakorn Vitayawatanakul  -  6833026821
Kitpoom Theptawee  -  6833004021
Natnicha Inthong  -  6833083521
Paweekorn Dechatiwong Na Ayutthaya  -  6833161821
Sirawit Kanchanakhirithamrong  -  6833266021

Project for Group 43