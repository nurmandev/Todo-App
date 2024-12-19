import request from "supertest";
import httpStatus from "http-status";
import { app } from "../../src";
import { generateToken } from "../../src/utils";
//
const token = generateToken("2fe0bb26-466f-4805-87ac-15d8f19a2e58");

describe("POST /api/v1/todos/create", () => {
  it("should create a todo successfully", async () => {
    const todoData = {
      userId: "string",
      title: "Test Todo",
      description: "Test Description",
      status: true,
      dueDate: new Date().toISOString(),
    };

    const response = await request(app)
      .post("/api/v1/todos/create")
      .send(todoData)
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toHaveProperty("userId"); // Ensure the response contains an ID
    expect(response.body.title).toBe(todoData.title);
    expect(response.body.description).toBe(todoData.description);
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/v1/todos/create")
      .send({}) // Send empty body
      .set("Authorization", `Bearer ${token}`); // Assuming you're using JWT auth

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toHaveProperty("message", "Required fields missing.");
  });
});
