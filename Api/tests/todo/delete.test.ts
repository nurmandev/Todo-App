import request from "supertest";
import httpStatus from "http-status";
import { app } from "../../src";
import { generateToken } from "../../src/utils";

const token = generateToken("2fe0bb26-466f-4805-87ac-15d8f19a2e58");

describe("DELETE /api/v1/todos/:todoid", () => {
  it("should delete a todo successfully", async () => {
    const todoId = "existing-todo-id"; // Replace with a valid ID

    const response = await request(app)
      .delete(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NO_CONTENT);
  });

  it("should return a 404 if the todo is not found", async () => {
    const todoId = "non-existing-todo-id"; // Replace with a non-existing ID

    const response = await request(app)
      .delete(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty("message", "Todo not found");
  });
});
