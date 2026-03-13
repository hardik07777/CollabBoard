CollabBoard

CollabBoard is a real-time collaborative task board where teams can organize work using boards, lists, and cards with live updates.
It provides an experience similar to Trello, focusing on real-time synchronization, smooth drag-and-drop interactions, and scalable backend architecture.

Live Demo
https://collab-board-tfch.vercel.app/

Features
 Boards
 Create multiple boards to organize different projects.
 Lists & Tasks
 Add lists and cards to structure workflows.
 Drag & Drop
 Smooth drag-and-drop functionality to reorder lists and tasks.
 Real-Time Collaboration
 All updates sync instantly across users.


Authentication
 Secure login and protected routes.
 Persistent Storage
 All data stored in MongoDb.

Tech Stack

FRONTEND
React
TypeScript
React Query
Tailwind CSS
@hello-pangea/dnd


BACKEND
Node.js
Express.js
WebSockets

Database
MongoDb

Other Tools
Multer (file uploads)


🏗 System Architecture
                ┌────────────────────┐
                │      Frontend      │
                │   React + TS UI    │
                └─────────┬──────────┘
                          │
                   REST API + WS
                          │
                ┌─────────▼─────────┐
                │      Backend      │
                │  Node + Express   │
                └─────────┬─────────┘
                          │
                          │
                ┌─────────▼─────────┐
                │    PostgreSQL     │
                │     MongoDb       │
                └───────────────────┘

Real-time synchronization between clients is handled through WebSockets, ensuring instant updates across all users.

📂 Project Structure
collabboard
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   ├── hooks
│   └── utils
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── workers
│   └── middleware
│
├── uploads
│
└── README.md

⚙️ Installation

1️⃣ Clone the Repository
git clone https://github.com/yourusername/collabboard.git
cd collabboard

2️⃣ Install Dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install

3️⃣ Environment Variables
Create a .env file inside the backend folder.

Example:
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/collabboard
JWT_SECRET=your_secret_key


4️⃣ Run the Project

Start Backend
npm run dev
Start Frontend
npm run dev


Activity logs

Notifications
Mobile optimization
AI-assisted task suggestions

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



👨‍💻 Author
Hardik Goel
