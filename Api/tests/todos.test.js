const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../dist/routes");
require("dotenv").config();

describe("Todos CRUD Endpoints", () => {
  let token;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a user and get a token
    const userResponse = await request(app).post("/signup").send({
      name: "Todo Tester",
      email: "todo@example.com",
      password: "password123",
    });

    token = `Bearer ${userResponse.body.token}`;
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  it("should create a todo", async () => {
    const response = await request(app)
      .post("/create")
      .set("Authorization", token)
      .send({
        title: "Test Todo",
        description: "This is a test todo",
        status: "pending",
        dueDate: "2024-12-31",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("msg", "todo created");
    expect(response.body.todo).toHaveProperty("title", "Test Todo");
  });

  it("should fetch all todos for the user", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("todos");
    expect(response.body.todos.length).toBeGreaterThan(0);
  });

  it("should update a todo", async () => {
    const todos = await request(app).get("/todos").set("Authorization", token);
    const todoId = todos.body.todos[0]._id;

    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set("Authorization", token)
      .send({
        title: "Updated Todo",
        description: "Updated description",
        status: "completed",
        dueDate: "2024-12-31",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Todo Updated Successfully"
    );
  });

  it("should delete a todo", async () => {
    const todos = await request(app).get("/todos").set("Authorization", token);
    const todoId = todos.body.todos[0]._id;

    const response = await request(app)
      .delete(`/todos/${todoId}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Todo deleted successfully"
    );
  });
});
