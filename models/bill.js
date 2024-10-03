import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  duedate: {
    type: Date,
    min: "2020-01-01",
    max: "2030-12-31",
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

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
