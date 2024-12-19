import request from "supertest";
import httpStatus from "http-status";
import { app } from "../../src";
import { generateToken } from "../../src/utils";

const token = generateToken("2fe0bb26-466f-4805-87ac-15d8f19a2e58");

describe("PUT /api/v1/todos/:todoid", () => {
  it("should update a todo successfully", async () => {
    const todoId = "existing-todo-id"; // Replace with a valid ID
    const updateData = {
      title: "Updated Todo Title",
      description: "Updated Todo Description",
    };

    const response = await request(app)
      .put(`/api/v1/todos/${todoId}`)
      .send(updateData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.title).toBe(updateData.title);
    expect(response.body.description).toBe(updateData.description);
  });

  it("should return a 404 if the todo is not found", async () => {
    const todoId = "non-existing-todo-id"; // Replace with a non-existing ID
    const updateData = {
      title: "Updated Todo Title",
    };

    const response = await request(app)
      .put(`/api/v1/todos/${todoId}`)
      .send(updateData)
      .set("Authorization", "Bearer your-valid-jwt-token-here");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty("message", "Todo not found");
  });
});
