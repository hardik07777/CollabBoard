# 🚀 CollabBoard

A modern **real-time collaborative task management platform** inspired by Trello. CollabBoard enables teams to organize projects using boards, lists, and cards while synchronizing changes instantly across connected users.

🌐 **Live Demo:** https://collab-board-tfch.vercel.app/

---

## ✨ Features

### 📋 Project Organization
- Create multiple boards for different projects
- Organize work using lists and task cards
- Clean and intuitive Kanban interface

### ⚡ Real-Time Collaboration
- Instant synchronization across all connected users
- Live updates powered by WebSockets
- No page refresh required

### 🎯 Drag & Drop
- Smooth drag-and-drop interactions
- Reorder boards, lists, and tasks effortlessly

### 🔐 Authentication
- Secure user authentication
- Protected routes
- JWT-based authorization

### 💾 Persistent Storage
- MongoDB for reliable data persistence
- Scalable backend architecture

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- React Query
- Tailwind CSS
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- WebSockets

### Database
- MongoDB

---

## 📁 Project Structure

```text
CollabBoard
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── api
│   └── utils
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   └── workers
│
├── uploads
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/collabboard.git

cd collabboard
```

---

### 2. Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## 📸 Screenshots

Add screenshots or GIFs showcasing:

- Dashboard
- Boards
- Drag & Drop
- Real-time Updates

---

## 🚧 Roadmap

- 🔔 Notifications
- 📱 Mobile responsiveness
- 🤖 AI-assisted task suggestions
- 📊 Activity logs
- 📎 File attachments
- 👥 Team invitations

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve CollabBoard, feel free to fork the repository, create a feature branch, and submit a pull request.

For major changes, please open an issue first to discuss your ideas.

---

## 👨‍💻 Author

**Hardik Goel**

GitHub: https://github.com/hardik07777

Portfolio: https://portfolio-hardik07.vercel.app/

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
