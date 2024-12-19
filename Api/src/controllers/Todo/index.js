"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTodosController = exports.deleteTodoController = exports.updateTodoController = exports.getTodoByIdController = exports.getAllTodosController = exports.createTodoController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const utils_1 = require("../../utils");
const services_1 = require("../../services");
const createTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    console.log("userId", userId);
    const todoData = req.body;
    const newTodo = yield services_1.todoService.createTodo(userId, todoData);
    if (!newTodo) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .json({ message: "Failed to create Todo" });
    }
    res.status(http_status_1.default.CREATED).json(newTodo);
});
const getAllTodosHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield services_1.todoService.getAllTodos();
    res.status(http_status_1.default.OK).json(todos);
});
const getUserTodosHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { status, sortBy, order } = req.query;
    const filters = {};
    if (status !== undefined)
        filters.status = status === "true";
    const todos = yield services_1.todoService.getTodosByUserId(userId, filters, sortBy || "createdAt", order || "ASC");
    res.status(http_status_1.default.OK).json(todos);
});
const getTodoByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoid } = req.params;
    const todo = yield services_1.todoService.getTodoById(todoid);
    if (!todo) {
        return res.status(http_status_1.default.NOT_FOUND).json({ message: "Todo not found" });
    }
    res.status(http_status_1.default.OK).json(todo);
});
const updateTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoid } = req.params;
    const updateData = req.body;
    const updatedTodo = yield services_1.todoService.updateTodo(todoid, updateData);
    if (!updatedTodo) {
        return res.status(http_status_1.default.NOT_FOUND).json({ message: "Todo not found" });
    }
    res.status(http_status_1.default.OK).json(updatedTodo);
});
const deleteTodoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoid } = req.params;
    const isDeleted = yield services_1.todoService.deleteTodo(todoid);
    if (!isDeleted) {
        return res.status(http_status_1.default.NOT_FOUND).json({ message: "Todo not found" });
    }
    res.status(http_status_1.default.NO_CONTENT).send();
});
exports.createTodoController = (0, utils_1.errorHandlerWrapper)(createTodoHandler);
exports.getAllTodosController = (0, utils_1.errorHandlerWrapper)(getAllTodosHandler);
exports.getTodoByIdController = (0, utils_1.errorHandlerWrapper)(getTodoByIdHandler);
exports.updateTodoController = (0, utils_1.errorHandlerWrapper)(updateTodoHandler);
exports.deleteTodoController = (0, utils_1.errorHandlerWrapper)(deleteTodoHandler);
exports.getUserTodosController = (0, utils_1.errorHandlerWrapper)(getUserTodosHandler);
//# sourceMappingURL=index.js.map