import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  board: Types.ObjectId;
  list: Types.ObjectId;
  order: number;
  assignedTo?: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },

    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


TaskSchema.index({ title: "text" });

TaskSchema.index({ list: 1, order: 1 });
TaskSchema.index({ board: 1 , createdAt : -1});

export default mongoose.model<ITask>("Task", TaskSchema);
