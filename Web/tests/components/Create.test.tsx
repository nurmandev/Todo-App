import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import Create from "../../src/components/Create";
import React from "react";

// Mock modules
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("axios");

describe("Create Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token"); // Mock local storage
  });

  afterEach(() => {
    vi.clearAllMocks(); // Reset mocks
    localStorage.clear(); // Clear local storage
  });

  test("renders the component", () => {
    render(<Create />);
    expect(screen.getByText("Create New Todo")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  test("shows error when required fields are empty", async () => {
    render(<Create />);

    // Click Create Todo button without filling fields
    fireEvent.click(screen.getByText(/create todo/i));

    // Check for error message
    expect(
      screen.getByText(
        "All fields (title, description, and due date) are required."
      )
    ).toBeInTheDocument();
  });

  //   test("sends API request and navigates on success", async () => {
  //     const mockNavigate = vi.fn();
  //     vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  //     vi.mocked(axios.post).mockResolvedValue({}); // Mock API success

  //     render(<Create />);

  //     // Fill out the form
  //     fireEvent.change(screen.getByLabelText(/title/i), {
  //       target: { value: "Test Todo" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/description/i), {
  //       target: { value: "This is a test todo." },
  //     });
  //     fireEvent.change(screen.getByLabelText(/due date/i), {
  //       target: { value: "2023-12-31" },
  //     });

  //     // Click Create Todo button
  //     fireEvent.click(screen.getByText(/create todo/i));

  //     // Check that the loading state is displayed
  //     expect(screen.getByText("Creating...")).toBeInTheDocument();

  //     // Check that the API was called
  //     expect(axios.post).toHaveBeenCalledWith(
  //       "http://localhost:8000/api/v1/todos/create",
  //       {
  //         title: "Test Todo",
  //         description: "This is a test todo.",
  //         status: false,
  //         dueDate: "2023-12-31",
  //       },
  //       {
  //         headers: { Authorization: "mock-token" },
  //       }
  //     );

  //     // Verify navigation
  //     expect(mockNavigate).toHaveBeenCalledWith("/todos");
  //   });

  test("shows error when API call fails", async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error("API error"));

    render(<Create />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Todo" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "This is a test todo." },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2023-12-31" },
    });

    // Click Create Todo button
    fireEvent.click(screen.getByText(/create todo/i));

    // Wait for error message
    expect(
      await screen.findByText(/failed to create todo/i)
    ).toBeInTheDocument();
  });

  //   test("navigates back when Back button is clicked", () => {
  //     const mockNavigate = vi.fn();
  //     vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  //     render(<Create />);

  //     // Click Back button
  //     fireEvent.click(screen.getByText("Back"));

  //     // Verify navigation
  //     expect(mockNavigate).toHaveBeenCalledWith("/todos");
  //   });
});
