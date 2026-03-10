import { Router } from "express";
import { createBoard, getBoards ,getBoardById, inviteMember, deleteBoard, deleteList } from "../controllers/board.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();


router.post("/:id/invite", authenticate, inviteMember);
router.post("/", authenticate, createBoard);
router.get("/", authenticate, getBoards);
router.get("/:id", authenticate, getBoardById);
router.get("/:id/activity", authenticate, getBoardById);
router.delete("/:id", authenticate, deleteBoard);

export default router;
