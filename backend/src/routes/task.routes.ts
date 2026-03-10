import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { boardAccess } from "../middleware/boardAccess";

import {
  createTask,
  getTasksByList,
  moveTask,
  deleteTask,
  updateTask,
    assignTask,
} from "../controllers/task.controller";

const router = Router();

// Create task under a list
router.post("/:listId", authenticate, createTask);

// Get tasks by list
router.get("/:listId", authenticate, getTasksByList);

// Move task (drag & drop)
router.patch("/move/:taskId", authenticate,moveTask);

// Update task (title, description, etc)
router.patch("/:taskId", authenticate, updateTask);

// Delete task
router.delete("/:taskId", authenticate, deleteTask);
router.patch(
  "/:taskId/assign",
  authenticate,
  boardAccess,
  assignTask
);


export default router;
