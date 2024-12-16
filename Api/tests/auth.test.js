const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../dist/routes");
require("dotenv").config();

describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  it("should signup a new user and return a token", async () => {
    const response = await request(app).post("/signup").send({
      name: "Auth Tester",
      email: "auth@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should login an existing user and return a token", async () => {
    const response = await request(app).post("/login").send({
      email: "auth@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with incorrect credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "auth@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
