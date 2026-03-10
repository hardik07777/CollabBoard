import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";
import { connectDB } from "./config/db";
import boardRoutes from "./routes/board.routes";
import listRoutes from "./routes/list.routes";
import http from "http";
import { initSocket } from "./sockets";
import { setIO } from "./socket";
import app from "./app";
import taskRoutes from "./routes/task.routes";


import activityRoutes from "./routes/activity.routes";



dotenv.config();
const server = http.createServer(app);

// const httpServer = createServer(app);
const io = initSocket(server);
setIO(io);



app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activity", activityRoutes);





// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("Task Collaboration API Running 🚀");
});

app.use("/api/auth", authRoutes);

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "You are authenticated " });
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_board", (boardId: string) => {
    socket.join(boardId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
