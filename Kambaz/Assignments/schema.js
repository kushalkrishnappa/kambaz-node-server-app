import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    availableDate: String,
    dueDate: String,
    availableUntil: String,
    points: Number,
    modules: [String],
    description: String,
  },
  { collection: "assignments" }
);

export default schema;
