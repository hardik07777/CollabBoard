import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { boardAccess } from "../middleware/boardAccess";
import { createList, getLists } from "../controllers/list.controller";
import { deleteList } from "../controllers/board.controller";

const router = Router();

router.post("/:boardId", authenticate, boardAccess, createList);
router.get("/:boardId", authenticate, boardAccess, getLists);
router.delete("/:id", authenticate, deleteList);


export default router;