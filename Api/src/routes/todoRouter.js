"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const utils_1 = require("../utils");
exports.todoRouter = express_1.default.Router();
exports.todoRouter.post("/create", utils_1.checkAuth, controllers_1.TodoController.createTodoController);
exports.todoRouter.get("/", utils_1.checkAuth, controllers_1.TodoController.getUserTodosController);
exports.todoRouter.get("/:todoid", controllers_1.TodoController.getTodoByIdController);
exports.todoRouter.put("/:todoid", controllers_1.TodoController.updateTodoController);
exports.todoRouter.delete("/:todoid", controllers_1.TodoController.deleteTodoController);
//# sourceMappingURL=todoRouter.js.map