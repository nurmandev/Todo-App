import httpStatus from "http-status";
import { errorHandlerWrapper } from "../../utils";
import { todoService } from "../../services";

// Handler for creating a Todo
const createTodoHandler = async (req, res) => {
  const userId = req.user.userId;
  console.log("userId", userId);
  const todoData = req.body;
  const newTodo = await todoService.createTodo(userId, todoData);
  if (!newTodo) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Failed to create Todo" });
  }
  res.status(httpStatus.CREATED).json(newTodo);
};

// Handler for getting all Todos
const getAllTodosHandler = async (req, res) => {
  const todos = await todoService.getAllTodos();
  res.status(httpStatus.OK).json(todos);
};

const getUserTodosHandler = async (req, res) => {
  const userId = req.user.userId;

  // Extract query parameters for filtering and sorting
  const { status, sortBy, order } = req.query;
  // Build filters dynamically

  const filters: any = {};
  if (status !== undefined) filters.status = status === "true"; // Convert to boolean

  // Fetch todos with filters and sorting
  const todos = await todoService.getTodosByUserId(
    userId,
    filters,
    sortBy || "createdAt",
    order || "ASC"
  );

  res.status(httpStatus.OK).json(todos);
};

// Handler for getting a Todo by ID
const getTodoByIdHandler = async (req, res) => {
  const { todoid } = req.params;
  const todo = await todoService.getTodoById(todoid);
  if (!todo) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });
  }
  res.status(httpStatus.OK).json(todo);
};

// Handler for updating a Todo
const updateTodoHandler = async (req, res) => {
  const { todoid } = req.params;
  const updateData = req.body;
  const updatedTodo = await todoService.updateTodo(todoid, updateData);
  if (!updatedTodo) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });
  }
  res.status(httpStatus.OK).json(updatedTodo);
};

// Handler for deleting a Todo
const deleteTodoHandler = async (req, res) => {
  const { todoid } = req.params;
  const isDeleted = await todoService.deleteTodo(todoid);
  if (!isDeleted) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });
  }
  res.status(httpStatus.NO_CONTENT).send(); // No content returned on successful deletion
};

// Export the controllers wrapped with error handler
export const createTodoController = errorHandlerWrapper(createTodoHandler);
export const getAllTodosController = errorHandlerWrapper(getAllTodosHandler);
export const getTodoByIdController = errorHandlerWrapper(getTodoByIdHandler);
export const updateTodoController = errorHandlerWrapper(updateTodoHandler);
export const deleteTodoController = errorHandlerWrapper(deleteTodoHandler);
export const getUserTodosController = errorHandlerWrapper(getUserTodosHandler);
