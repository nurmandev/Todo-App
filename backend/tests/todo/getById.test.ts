import request from "supertest";
import httpStatus from "http-status";
import { app } from "../../src";
import { generateToken } from "../../src/utils";

const token = generateToken("2fe0bb26-466f-4805-87ac-15d8f19a2e58");

describe("GET /api/v1/todos/:todoid", () => {
  it("should fetch a todo by its ID", async () => {
    const todoId = "existing-todo-id"; // Replace with a valid ID

    const response = await request(app)
      .get(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty("id", todoId);
    expect(response.body).toHaveProperty("title");
  });

  it("should return a 404 if the todo is not found", async () => {
    const todoId = "non-existing-todo-id"; // Replace with a non-existing ID

    const response = await request(app)
      .get(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty("message", "Todo not found");
  });
});
