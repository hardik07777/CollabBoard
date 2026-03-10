import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBoard extends Document {
  title: string;
  description?: string;
  owner: Types.ObjectId;
  members: {
    user: Types.ObjectId;
    role: "owner" | "admin" | "member";
  }[];
}

const BoardSchema = new Schema<IBoard>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member"],
          default: "member",
        },
      },
    ],
  },
  { timestamps: true }
);

// Index for fast member-based queries
BoardSchema.index({ "members.user": 1 });

export default mongoose.model<IBoard>("Board", BoardSchema);
