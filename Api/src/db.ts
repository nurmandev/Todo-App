import mongoose from "mongoose";
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("DB connected"))
  .catch(() => console.log("Connection Error"));

// Todo Schema
const TodoSchema = new mongoose.Schema({
  todoid: String,
  userId: String,
  title: String,
  description: String,
  status: Boolean,
  dueDate: Date,
});

// User Schema
const UserSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
});

// Models
const todo = mongoose.model("todo", TodoSchema);
const user = mongoose.model("user", UserSchema);

// Exports
module.exports = {
  todo,
  user,
};
