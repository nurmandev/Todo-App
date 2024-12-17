import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcryptjs";
import { todo, user } from "./db";
import { createTodo, createUser, userLogin } from "./zod";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to verify JWT
const authenticate = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT || "") as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// User Signup
app.post("/signup", async (req, res) => {
  const { success, error, data } = createUser.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid user details" });
  }

  const existingUser = await user.findOne({ email: data.email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await user.create({
    ...data,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT || "", {
    expiresIn: "7d",
  });

  res.status(201).json({ message: "User created successfully", token });
});

// User Signin
app.post("/signin", async (req, res) => {
  const { success, error, data } = userLogin.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid user details" });
  }

  const existingUser = await user.findOne({ email: data.email });
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    existingUser.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT || "", {
    expiresIn: "7d",
  });

  res.json({ message: "Login successful", token });
});

// Create Todo
app.post("/create", authenticate, async (req, res) => {
  const { success, error, data } = createTodo.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid todo details" });
  }

  const newTodo = await todo.create({ ...data, userId: req.userId });

  res.status(201).json({ message: "Todo created successfully", todo: newTodo });
});

// Get Todos
app.get("/todos", authenticate, async (req, res) => {
  const { sortBy, order, status } = req.query;
  let filter: any = { userId: req.userId };

  if (status) {
    if (status === "true" || status === "false") {
      filter.status = status === "true";
    } else {
      return res
        .status(400)
        .json({ error: "Invalid status value. Use 'true' or 'false'." });
    }
  }

  const sort = sortBy ? { [sortBy]: order === "desc" ? -1 : 1 } : {};
  const todos = await todo.find(filter).sort(sort);

  res.json({ todos });
});

// Update Todo
app.put("/todos/:id", authenticate, async (req, res) => {
  const { success, error, data } = createTodo.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const updatedTodo = await todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { $set: data },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found or unauthorized" });
  }

  res.json({ message: "Todo updated successfully", todo: updatedTodo });
});

// Delete Todo
app.delete("/todos/:id", authenticate, async (req, res) => {
  const deletedTodo = await todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!deletedTodo) {
    return res.status(404).json({ error: "Todo not found or unauthorized" });
  }

  res.json({ message: "Todo deleted successfully" });
});

// Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
