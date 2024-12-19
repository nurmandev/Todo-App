"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const authRouter_1 = require("./authRouter");
const express_1 = require("express");
const todoRouter_1 = require("./todoRouter");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use("/auth", authRouter_1.authRouter);
exports.appRouter.use("/todos", todoRouter_1.todoRouter);
//# sourceMappingURL=index.js.map