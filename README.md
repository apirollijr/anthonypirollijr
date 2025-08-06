# anthonypirollijr

A full-stack web application built with React and Express. This project demonstrates core concepts such as frontend routing, backend API development, user authentication, CRUD operations, and responsive design using Bootstrap.

## Features

- Responsive React frontend
- RESTful API using Express.js
- MongoDB for data storage (via Mongoose)
- JWT-based authentication
- Bootstrap-styled UI
- Admin dashboard for managing content
- Dynamic project portfolio display

## Tech Stack

**Client:** React, Bootstrap  
**Server:** Node.js, Express.js  
**Database:** MongoDB + Mongoose  
**Auth:** JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-name.git
Navigate to the project directory:

bash
Copy
Edit
cd project-name
Install server dependencies:

bash
Copy
Edit
cd server
npm install
Install client dependencies:

bash
Copy
Edit
cd ../client
npm install
Set up environment variables in a .env file in the /server folder:

ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
Run the development servers:

Server:

bash
Copy
Edit
cd server
npm run dev
Client:

bash
Copy
Edit
cd client
npm start
Visit http://localhost:3000 in your browser.

Folder Structure
csharp
Copy
Edit
project-name/
├── client/             # React frontend
│   ├── public/
│   └── src/
├── server/             # Express backend
│   ├── models/
│   ├── routes/
│   └── controllers/
└── README.md
Deployment
Frontend can be deployed to Netlify or Vercel

Backend can be deployed to Heroku, Render, or Railway

Use MongoDB Atlas for cloud database

License
This project is licensed under the MIT License.
