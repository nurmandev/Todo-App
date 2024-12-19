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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodosByUserId = exports.getAllTodos = exports.createTodo = void 0;
const db_1 = require("../db");
const todo_entity_1 = require("../entities/todo.entity");
const createTodo = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = db_1.AppDataSouce.getRepository(todo_entity_1.TodoEntity);
    const todo = todoRepository.create(Object.assign(Object.assign({ userId }, data), { status: data.status || false }));
    yield todoRepository.save(todo);
    return todo;
});
exports.createTodo = createTodo;
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = db_1.AppDataSouce.getRepository(todo_entity_1.TodoEntity);
    return yield todoRepository.find();
});
exports.getAllTodos = getAllTodos;
const getTodosByUserId = (userId_1, filters_1, ...args_1) => __awaiter(void 0, [userId_1, filters_1, ...args_1], void 0, function* (userId, filters, sortBy = "createdAt", order = "ASC") {
    const todoRepository = db_1.AppDataSouce.getRepository(todo_entity_1.TodoEntity);
    const where = Object.assign({ userId }, filters);
    console.log({
        [sortBy]: order.toUpperCase() === "ASC" ? "ASC" : "DESC",
    });
    const options = {
        where,
        order: {
            [sortBy]: order.toUpperCase() === "ASC" ? "ASC" : "DESC",
        },
    };
    const todos = yield todoRepository.find(options);
    return todos;
});
exports.getTodosByUserId = getTodosByUserId;
const getTodoById = (todoid) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = db_1.AppDataSouce.getRepository(todo_entity_1.TodoEntity);
    return yield todoRepository.findOne({ where: { todoid } });
});
exports.getTodoById = getTodoById;
const updateTodo = (todoid, data) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = db_1.AppDataSouce.getRepository(todo_entity_1.TodoEntity);
    const todo = yield todoRepository.findOne({ where: { todoid } });
    if (!todo)
        return null;
    todoRepository.merge(todo, data);
    yield todoRepository.save(todo);
    return todo;
});
exports.updateTodo = updateTodo;
const deleteTodo = (todoid) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = db_1.AppDataSouce.getRepository(todo_entity_1.TodoEntity);
    const result = yield todoRepository.delete({ todoid });
    return result.affected > 0;
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.service.js.map