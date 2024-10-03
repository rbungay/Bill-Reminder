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
  },
  status: {
    type: String,
    enum: ["unpaid", "paid", "overdue"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
