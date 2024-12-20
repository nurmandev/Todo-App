// tests/components/TodoList.test.tsx
import { describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import TodoList from "../../src/components/Todos";

// Mock axios
vi.mock("axios");

describe("TodoList Component", () => {
  //   const mockTodos = [
  //     {
  //       todoid: "1",
  //       title: "Test Todo 1",
  //       description: "This is a test todo",
  //       status: false,
  //       dueDate: "2024-12-31",
  //     },
  //     {
  //       todoid: "2",
  //       title: "Test Todo 2",
  //       description: "Another test todo",
  //       status: true,
  //       dueDate: "2024-12-25",
  //     },
  //   ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "mockToken");
  });

  it("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  //   it("fetches and displays todos", async () => {
  //     mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <TodoList />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  //       expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  //     });

  //     expect(mockedAxios.get).toHaveBeenCalledWith(
  //       "http://localhost:8000/api/v1/todos",
  //       {
  //         headers: { Authorization: "mockToken" },
  //         params: { sortBy: "dueDate", order: "asc", status: "" },
  //       }
  //     );
  //   });

  //   it("allows editing a todo", async () => {
  //     mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });
  //     mockedAxios.put.mockResolvedValueOnce({});

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <TodoList />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  //     });

  //     const editButton = screen.getAllByText("Edit")[0];
  //     fireEvent.click(editButton);

  //     const titleInput = screen.getByPlaceholderText("Edit title");
  //     fireEvent.change(titleInput, { target: { value: "Updated Todo 1" } });

  //     const saveButton = screen.getByText("Save");
  //     fireEvent.click(saveButton);

  //     await waitFor(() => {
  //       expect(mockedAxios.put).toHaveBeenCalledWith(
  //         "http://localhost:8000/api/v1/todos/1",
  //         {
  //           todoid: "1",
  //           title: "Updated Todo 1",
  //           description: "This is a test todo",
  //           status: false,
  //           dueDate: "2024-12-31",
  //         },
  //         { headers: { Authorization: "mockToken" } }
  //       );

  //       expect(screen.getByText("Todo updated successfully!")).toBeInTheDocument();
  //     });
  //   });

  //   it("allows deleting a todo", async () => {
  //     mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });
  //     mockedAxios.delete.mockResolvedValueOnce({});

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <TodoList />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  //     });

  //     const deleteButton = screen.getAllByText("Delete")[0];
  //     fireEvent.click(deleteButton);

  //     await waitFor(() => {
  //       expect(mockedAxios.delete).toHaveBeenCalledWith(
  //         "http://localhost:8000/api/v1/todos/1",
  //         { headers: { Authorization: "mockToken" } }
  //       );

  //       expect(screen.getByText("Todo deleted successfully!")).toBeInTheDocument();
  //     });
  //   });

  //   it("handles API errors gracefully", async () => {
  //     mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <TodoList />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Failed to load todos!")).toBeInTheDocument();
  //     });
  //   });
});
