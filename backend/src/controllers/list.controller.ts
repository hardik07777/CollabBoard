import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import List from "../models/List";

// Create List
export const createList = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;

    // Get highest order
    const lastList = await List.findOne({ board: boardId })
      .sort({ order: -1 });

    const newOrder = lastList ? lastList.order + 1 : 0;

    const list = await List.create({
      title,
      board: boardId,
      order: newOrder,
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: "Error creating list" });
  }
};

// Get Lists for Board
export const getLists = async (req: AuthRequest, res: Response) => {
  try {
    const { boardId } = req.params;

    const lists = await List.find({ board: boardId })
      .sort({ order: 1 });

    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lists" });
  }
};

