import mongoose, { Schema, Document, Types } from "mongoose";

export interface IList extends Document {
  title: string;
  board: Types.ObjectId;
  order: number;
}

const ListSchema = new Schema<IList>(
  {
    title: { type: String, required: true },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Important index for fast sorting inside board
ListSchema.index({ board: 1, order: 1 });

export default mongoose.model<IList>("List", ListSchema);
