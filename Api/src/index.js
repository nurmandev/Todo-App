"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const env_1 = require("./env");
const app = (0, express_1.default)();
exports.app = app;
(0, db_1.dbCreate)();
db_1.AppDataSouce.initialize();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middlewares_1.routeMiddleware);
app.use("/health", (_req, res) => {
    res.json({ msg: "Hello Get Zell" });
});
app.use("/api/v1", routes_1.appRouter);
app.use(middlewares_1.errorHandlerMiddleware);
const { port } = env_1.Env;
app.listen(port, () => {
    console.log(`Server is listening on ${port}.`);
});
//# sourceMappingURL=index.js.map