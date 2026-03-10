import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Activity from "../models/Activity";

export const getBoardActivity = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { boardId } = req.params;

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      Activity.find({ board: boardId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name email"),

      Activity.countDocuments({ board: boardId })
    ]);

    res.json({
      success: true,
      page,
      total,
      pages: Math.ceil(total / limit),
      data: activities,
    });

  } catch (error) {
    console.error("Activity fetch error:", error);
    res.status(500).json({ message: "Error fetching activity" });
  }
};
