import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Task from "../models/Task";
import mongoose from "mongoose";
import List from "../models/List";
import { getIO } from "../socket";
import Activity from "../models/Activity"; // ✅ ADDED
import Board from "../models/Boards";
import { canManageLists } from "../utils/boardPermissions";

console.log("HIT CREATE TASK");

export const createTask = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { listId } = req.params;
    const { title, description } = req.body;

    const list = await List.findById(listId).session(session);
    if (!list) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "List not found" });
    }

    const board = await Board.findById(list.board).session(session);
    if (!board) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Board not found" });
    }

    // 🔐 Permission check
    if (!canManageLists(board, req.userId!)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: "Not allowed" });
    }

    const lastTask = await Task.findOne({ list: listId })
      .sort({ order: -1 })
      .session(session);

    const newOrder = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create([{
      title,
      description,
      board: list.board,
      list: listId,
      order: newOrder,
    }], { session });

    // ✅ Activity in SAME transaction
    const activity = await Activity.create([{
      board: list.board,
      task: task[0]._id,
      user: req.userId,
      action: "TASK_CREATED",
      meta: { title: task[0].title },
    }], { session });

    await session.commitTransaction();
    session.endSession();

    // populate AFTER commit (safer)
    const populatedActivity = await activity[0].populate("user", "name email");

    const io = getIO();
    io.to(list.board.toString()).emit("activity:created", populatedActivity);

    return res.status(201).json(task[0]);

  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    console.error("CREATE TASK ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { listId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string;

    const skip = (page - 1) * limit;

    let query: any = { list: listId };

    if (search) {
      query.$text = { $search: search };
    }

    const tasks = await Task.find(query)
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: tasks,
    });

    console.log("Querying for list:", listId);
    console.log("Tasks found:", tasks);

  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};


export const moveTask = async (req: AuthRequest , res: Response) => {
  try {
    const taskId = req.params.taskId as string;
    const objectTaskId = new mongoose.Types.ObjectId(taskId);

    const { sourceListId, destinationListId, newOrder } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const board = await Board.findById(task.board);

if (!board) return res.status(404).json({ message: "Board not found" });

if (!canManageLists(board, req.userId!)) {
  return res.status(403).json({ message: "Not allowed" });
}


    if (sourceListId === destinationListId) {
      await Task.updateMany(
        {
          list: sourceListId,
          order: { $gte: newOrder },
          _id: { $ne: objectTaskId },
        },
        { $inc: { order: 1 } }
      );

      task.order = newOrder;
      await task.save();
    }
    else {
      await Task.updateMany(
        {
          list: sourceListId,
          order: { $gt: task.order },
        },
        { $inc: { order: -1 } }
      );

      await Task.updateMany(
        {
          list: destinationListId,
          order: { $gte: newOrder },
        },
        { $inc: { order: 1 } }
      );

      task.list = destinationListId;
      task.order = newOrder;
      await task.save();
    }

    // ✅ ACTIVITY ADDED
    const activity = await Activity.create({
      board: task.board,
      task: task._id,
      user: req.userId,
      action: "TASK_MOVED",
    });

    const populatedActivity = await activity.populate("user", "name email");

    const io = getIO();
    io.to(task.board.toString()).emit("activity:created", populatedActivity);

    res.json({ message: "Task moved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error moving task" });
  }
};


export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const board = await Board.findById(task.board);

if (!board) return res.status(404).json({ message: "Board not found" });

if (!canManageLists(board, req.userId!)) {
  return res.status(403).json({ message: "Not allowed" });
}

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();

    // ✅ ACTIVITY ADDED
    const activity = await Activity.create({
      board: task.board,
      task: task._id,
      user: req.userId,
      action: "TASK_UPDATED",
      meta: { title: task.title },
    });

    const populatedActivity = await activity.populate("user", "name email");

    const io = getIO();
    io.to(task.board.toString()).emit("activity:created", populatedActivity);

    res.json({ success: true, data: task });

  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};


export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const board = await Board.findById(task.board);

if (!board) return res.status(404).json({ message: "Board not found" });

if (!canManageLists(board, req.userId!)) {
  return res.status(403).json({ message: "Not allowed" });
}

    await Task.updateMany(
      {
        list: task.list,
        order: { $gt: task.order },
      },
      { $inc: { order: -1 } }
    );

    // ✅ ACTIVITY ADDED BEFORE DELETE
    const activity = await Activity.create({
      board: task.board,
      task: task._id,
      user: req.userId,
      action: "TASK_DELETED",
      meta: { title: task.title },
    });

    const populatedActivity = await activity.populate("user", "name email");

    await task.deleteOne();

    const io = getIO();
    io.to(task.board.toString()).emit("activity:created", populatedActivity);

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};


export const assignTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const board = await Board.findById(task.board);

if (!board) return res.status(404).json({ message: "Board not found" });

if (!canManageLists(board, req.userId!)) {
  return res.status(403).json({ message: "Not allowed" });
}

    task.assignedTo = userId;
    await task.save();

    // ✅ ACTIVITY ADDED
    const activity = await Activity.create({
      board: task.board,
      task: task._id,
      user: req.userId,
      action: "TASK_UPDATED",
    });

    const populatedActivity = await activity.populate("user", "name email");

    const io = getIO();
    io.to(task.board.toString()).emit("activity:created", populatedActivity);

    res.json({ success: true, data: task });

  } catch (error) {
    res.status(500).json({ message: "Error assigning task" });
  }
};


export const getTasksByList = async  (req: AuthRequest, res: Response) => {
  const { listId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const tasks = await Task.find({ list: listId })
    .sort({ order: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(tasks);
};