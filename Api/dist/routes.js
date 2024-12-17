"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const { todo, user } = require("./db");
const { createTodo, createUser, userLogin } = require("./zod");
const bcrypt = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());

// User Signup
app.post("/signup", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userDetail = req.body;
    const parsedUser = yield createUser.safeParse(userDetail);
    if (!parsedUser.success) {
      res.status(400).json({ error: "Invalid user details" });
      return;
    }
    const existingUser = yield user.findOne({ email: userDetail.email });
    if (existingUser) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }
    const hashedPassword = yield bcrypt.hash(userDetail.password, 10);
    const newUser = yield user.create({
      name: userDetail.name,
      email: userDetail.email,
      password: hashedPassword,
    });
    const userId = newUser._id;
    const token = jsonwebtoken_1.default.sign(
      { userId },
      process.env.JWT || ""
    );
    res.json({
      msg: "User Created",
      userId: userId,
      token: token,
    });
  })
);

// User Signin
app.post("/signin", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userDetail = req.body;
    const parsedUser = yield userLogin.safeParse(userDetail);
    if (!parsedUser.success) {
      res.status(400).json({ error: "Invalid user details" });
      return;
    }
    const USER = yield user.findOne({
      email: userDetail.email,
    });
    if (!USER) {
      res.status(400).json({ msg: "User with this email not found" });
    }
    const isValidPassword = yield bcrypt.compare(
      userDetail.password,
      USER.password
    );
    if (!isValidPassword) {
      res.status(400).json({ msg: "Invalid Password" });
    }
    if (USER) {
      const token = jsonwebtoken_1.default.sign(
        { userId: USER._id },
        process.env.JWT || ""
      );
      res.json({
        msg: "User Logged In",
        userId: USER._id,
        token: token,
      });
    }
  })
);

// Create Todo
app.post("/create", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const todoDetail = req.body;
      const parsedTodo = yield createTodo.safeParse(todoDetail);
      if (!parsedTodo.success) {
        res.status(400).json({ error: "Invalid todo details" });
        return;
      }
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ error: "Authorization token missing" });
        return;
      }
      const decoded = jsonwebtoken_1.default.verify(
        token,
        process.env.JWT || ""
      );
      const userId = decoded.userId;
      const newTodo = yield todo.create({
        userId: userId,
        title: todoDetail.title,
        description: todoDetail.description,
        status: todoDetail.status,
        dueDate: todoDetail.dueDate,
      });
      res.json({
        msg: "Todo successfully created!",
        todo: newTodo,
      });
    } catch (e) {
      console.log(e);
    }
  })
);

// Get Todos with Sorting and Filtering
app.get("/todos", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ error: "Authorization token missing" });
        return;
      }
      const decoded = jsonwebtoken_1.default.verify(
        token,
        process.env.JWT || ""
      );
      const userId = decoded.userId;
      if (!userId) {
        res.status(401).json({ error: "Invalid Token" });
        return;
      }

      // Extract query parameters for sorting and filtering
      const { sortBy = "dueDate", order = "asc", status = "" } = req.query;

      const sortOrder = order === "desc" ? -1 : 1;
      const filter = { userId };

      // Add status filter only if provided
      if (status === "true" || status === "false") {
        filter.status = status === "true";
      }
      // Sorting logic
      const userTodos = yield todo.find(filter).sort({ [sortBy]: sortOrder });
      res.json({
        todos: userTodos,
      });
    } catch (e) {
      console.log(e);
      res.json({
        error: "Error fetching todos",
      });
    }
  })
);
// app.get("/todos", async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Authorization token missing" });
//     }

//     const decoded = jsonwebtoken.verify(token, process.env.JWT || "");
//     const userId = decoded.userId;

//     if (!userId) {
//       return res.status(401).json({ error: "Invalid Token" });
//     }

//     // Extract query parameters for sorting and filtering
//     const { sortBy = "dueDate", order = "asc", status = "" } = req.query;

//     const sortOrder = order === "desc" ? -1 : 1;
//     const filter = { userId };

//     // Add status filter only if provided
//     if (status === "true" || status === "false") {
//       filter.status = status === "true";
//     }

//     // Sorting logic
//     const userTodos = await todo.find(filter).sort({ [sortBy]: sortOrder });

//     res.json({ todos: userTodos });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Error fetching todos" });
//   }
// });

app.put("/todos/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const todoId = req.params.id;
      const data = req.body;
      const parsedUpdatedTodo = yield createTodo.safeParse(data);
      if (!parsedUpdatedTodo) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }
      const token = req.headers.authorization;
      if (!token) {
        res.json({
          error: "Authorization Token missing",
        });
        return;
      }
      const decode = jsonwebtoken_1.default.verify(
        token,
        process.env.JWT || ""
      );
      const userId = decode.userId;
      const updatedTodo = yield todo.findOneAndUpdate(
        { _id: todoId, userId: userId },
        { $set: parsedUpdatedTodo.data },
        { new: true }
      );
      if (!updatedTodo) {
        res.status(404).json({
          error: "Error Updating the todo",
          todo: updatedTodo,
        });
      }
      res.status(200).json({
        message: "Todo Updated Successfully",
      });
      return;
    } catch (e) {
      console.log(e);
    }
  })
);
app.delete(`/todos/:id`, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const todoId = req.params.id;
      const deletedTodo = yield todo.findByIdAndDelete(todoId);
      if (!deletedTodo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }
      res.json({
        message: "Todo deleted successfully",
      });
    } catch (e) {
      console.log(e);
    }
  })
);
const port = 3002;
app.listen(port, () => {
  console.log(`port is running on port ${port}`);
});
