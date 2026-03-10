import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import Board from "../models/Boards";

export const boardAccess = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const board = await Board.findOne({
      _id: boardId,
      "members.user": userId,
    });

    if (!board) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.board = board;   // ✅ now valid
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
