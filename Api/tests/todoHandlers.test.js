import request from "supertest";
import app from "../app"; // Your Express app
import { todoService } from "../src/services"; // Mock this service

jest.mock("../services/todoService"); // Mock the service layer

describe("Todo Handlers", () => {
  describe("POST /todos", () => {
    it("should create a todo successfully", async () => {
      const mockTodo = { id: 1, title: "Test Todo" };
      todoService.createTodo.mockResolvedValue(mockTodo);

      const response = await request(app)
        .post("/todos")
        .set("Authorization", "Bearer mockToken") // Example header
        .send({ title: "Test Todo" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTodo);
    });

    it("should return 400 if todo creation fails", async () => {
      todoService.createTodo.mockResolvedValue(null);

      const response = await request(app)
        .post("/todos")
        .send({ title: "Invalid Todo" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Failed to create Todo" });
    });
  });

  describe("GET /todos", () => {
    it("should retrieve all todos", async () => {
      const mockTodos = [
        { id: 1, title: "Todo 1" },
        { id: 2, title: "Todo 2" },
      ];
      todoService.getAllTodos.mockResolvedValue(mockTodos);

      const response = await request(app).get("/todos");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodos);
    });
  });
});
