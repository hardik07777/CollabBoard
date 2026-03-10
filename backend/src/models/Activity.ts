import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    meta: {
      type: Object,
    },
  },
  { timestamps: true }
);

// 🔥 Important indexes
activitySchema.index({ board: 1, createdAt: -1 });
activitySchema.index({ task: 1, createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
