//must import specific libraries from mongoose because it needs to be clearly defined the types we are using.
import mongoose, { Document, Schema, Model } from "mongoose";

//this defines the structure of the bill document
export interface IBill extends Document {
  name: string;
  amount: number;
  dueDate: Date;
  status: "unpaid" | "paid" | "overdue";
  category: mongoose.Types.ObjectId;
  owner?: mongoose.Types.ObjectId;
}

//this actually defines what's actually on the schema itself.
const billSchema: Schema<IBill> = new Schema<IBill>({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    min: new Date("2020-01-01"),
    max: new Date("2030-12-31"),
    required: true,
  },
  status: {
    type: String,
    enum: ["unpaid", "paid", "overdue"],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bill: Model<IBill> = mongoose.model<IBill>("Bill", billSchema);

export { Bill, billSchema };
