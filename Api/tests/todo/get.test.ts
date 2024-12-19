import request from "supertest";
import httpStatus from "http-status";
import { app } from "../../src";
import { generateToken } from "../../src/utils";

const token = generateToken("2fe0bb26-466f-4805-87ac-15d8f19a2e58");

describe("GET /api/v1/todos/", () => {
  it("should fetch all todos for a user", async () => {
    const response = await request(app)
      .get("/api/v1/todos/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true); // Expect an array of todos
  });
});
