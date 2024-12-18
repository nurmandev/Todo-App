import express from "express";
import { TodoController } from "../controllers";
import { checkAuth } from "../utils";

export const todoRouter = express.Router();

// Route to create a new Todo
todoRouter.post("/create", checkAuth, TodoController.createTodoController);

// Route to get all Todos
// todoRouter.get("/todos", TodoController.getAllTodosController);

todoRouter.get("/", checkAuth, TodoController.getUserTodosController);

// Route to get a Todo by ID
todoRouter.get("/:todoid", TodoController.getTodoByIdController);

// Route to update a Todo
todoRouter.put("/:todoid", TodoController.updateTodoController);

// Route to delete a Todo
todoRouter.delete("/:todoid", TodoController.deleteTodoController);
