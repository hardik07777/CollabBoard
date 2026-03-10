import express from "express";
import { getBoardActivity } from "../controllers/activity.controller";
import { authenticate } from "../middleware/auth.middleware";
import { boardAccess } from "../middleware/boardAccess"; 
// ⚠ make sure path matches your file name

const router = express.Router();   // ✅ DEFINE ROUTER

router.get(
  "/boards/:boardId/activity",
  authenticate,
  boardAccess,
  getBoardActivity
);

export default router;
