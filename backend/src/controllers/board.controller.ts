import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Board from "../models/Boards";
import List from "../models/List";
import { User } from "../models/User";
import Activity from "../models/Activity";
import { canViewBoard } from "../utils/boardPermissions";
import mongoose from "mongoose";
import { canInvite } from "../utils/boardPermissions";
import { canManageLists } from "../utils/boardPermissions";
import { canDeleteBoard } from "../utils/boardPermissions";
import { getIO} from "../sockets/index";



// import {User} from "../models/User";
// Create Board
export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    const board = await Board.create({
      title,
      description,
      owner: userId,
      members: [{ user: userId, role: "owner" }],
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error creating board" });
  }
};

// Get User Boards
export const getBoards = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const boards = await Board.find({
      "members.user": new mongoose.Types.ObjectId(req.userId),
    })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: boards,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching boards" });
  }
};


export const getBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // ✅ SECURITY CHECK (IMPORTANT)
    if (!canViewBoard(board, req.userId!)) {
  return res.status(403).json({ message: "Access denied" });
}

    

    const lists = await List.find({ board: board._id }).sort("order");

    res.json({
      ...board.toObject(),
      lists,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching board" });
  }
};

export const inviteMember = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, role } = req.body;
    const boardId = req.params.id;
    const currentUserId = req.userId;

    const board = await Board.findById(boardId).session(session);
    if (!board) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Board not found" });
    }

    if (!canInvite(board, currentUserId!)) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Not allowed" });
    }

    const user = await User.findOne({ email }).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyMember = board.members.find(
      (m: any) => m.user.toString() === user._id.toString()
    );

    if (alreadyMember) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User already a member" });
    }
    console.log("Current user ID:", currentUserId);
console.log("Board members:", board.members);

    // 🔐 Prevent role escalation
    type Role = "owner" | "admin" | "member";

    let safeRole: Role = "member";
    if (role === "admin") safeRole = "admin";

    board.members.push({
      user: user._id,
      role: safeRole,
    });

    await board.save({ session });
    const io = getIO();


    await Activity.create([{
      board: board._id,
      user: currentUserId,
      action: "MEMBER_INVITED",
      meta: {
        invitedEmail: email,
        role: safeRole,
      },
    }], { session });

    await session.commitTransaction();
    session.endSession();

    // Emit real-time event

    io.to(`board:${boardId}`).emit("member:invited", {
  member: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: safeRole,
  },
  
});

    return res.json({
      success: true,
      message: "Member invited successfully",
    });
    

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Error inviting member" });
  }
};

export const getBoardActivity = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const boardId = req.params.id;

    const activities = await Activity.find({ board: boardId })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity" });
  }
};
export const deleteBoard = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const board = await Board.findById(id);
  if (!board) return res.status(404).json({ message: "Board not found" });

  // Optional: only owner/admin
  if (!canDeleteBoard(board, req.userId!)) {
  return res.status(403).json({ message: "Not allowed" });
}

  await Board.findByIdAndDelete(id);

  res.json({ message: "Board deleted" });
};
export const deleteList = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const board = await Board.findById(list.board);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (!canManageLists(board, req.userId!)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await list.deleteOne();

    return res.json({ message: "List deleted" });

  } catch (error) {
    return res.status(500).json({ message: "Error deleting list" });
  }
};