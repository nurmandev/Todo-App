// tests/components/Signup.test.tsx
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../../src/components/Signup";
import React from "react";

// Mock axios
vi.mock("axios");

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Signup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form and inputs", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    // expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    // expect(
    //   screen.getByPlaceholderText("johndoe@gmail.com")
    // ).toBeInTheDocument();
    // expect(screen.getByPlaceholderText("******")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText("******");
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    // Initially, the password input type should be "password"
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the toggle button to show the password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click the toggle button again to hide the password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  //   it("displays a success toast and navigates on successful signup", async () => {
  //     mockedAxios.post.mockResolvedValueOnce({
  //       data: {
  //         token: "mockToken",
  //       },
  //     });

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <Signup />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("John Doe"), {
  //       target: { value: "Test User" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
  //       target: { value: "test@example.com" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("******"), {
  //       target: { value: "password123" },
  //     });

  //     fireEvent.click(screen.getByText("Sign Up"));

  //     await waitFor(() => {
  //       expect(mockedAxios.post).toHaveBeenCalledWith(
  //         "http://localhost:8000/api/v1/auth/register",
  //         { name: "Test User", email: "test@example.com", password: "password123" }
  //       );
  //       expect(localStorage.getItem("token")).toBe("mockToken");
  //       expect(screen.getByText("Signup successful! Redirecting...")).toBeInTheDocument();
  //       expect(mockNavigate).toHaveBeenCalledWith("/todos");
  //     });
  //   });

  //   it("displays an error toast on failed signup", async () => {
  //     mockedAxios.post.mockRejectedValueOnce({
  //       response: {
  //         data: { message: "User already exists" },
  //       },
  //     });

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <Signup />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("John Doe"), {
  //       target: { value: "Existing User" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
  //       target: { value: "existing@example.com" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("******"), {
  //       target: { value: "password123" },
  //     });

  //     fireEvent.click(screen.getByText("Sign Up"));

  //     await waitFor(() => {
  //       expect(mockedAxios.post).toHaveBeenCalledWith(
  //         "http://localhost:8000/api/v1/auth/register",
  //         { name: "Existing User", email: "existing@example.com", password: "password123" }
  //       );
  //       expect(screen.getByText("User already exists")).toBeInTheDocument();
  //     });
  //   });
});
