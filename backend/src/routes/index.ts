import { authRouter } from "./authRouter";
import { Router } from "express";
import { todoRouter } from "./todoRouter";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/todos", todoRouter);
