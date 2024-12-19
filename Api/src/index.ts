import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";

const app = express();
// const setupServer = async () => {
dbCreate();

AppDataSouce.initialize();

app.use(cors());
app.use(express.json());
// app.use(clientUse());
app.use(routeMiddleware);
app.use("/health", (_req, res) => {
  res.json({ msg: "Hello Get Zell" });
});
app.use("/api/v1", appRouter);
app.use(errorHandlerMiddleware);

const { port } = Env;

app.listen(port, () => {
  console.log(`Server is listening on ${port}.`);
});
// };

// setupServer();
export { app };
