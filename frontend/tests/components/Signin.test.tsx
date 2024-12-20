import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signin from "../../src/components/Signin";
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

describe("Signin Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form and inputs", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("johndoe@gmail.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("******")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  //   it("toggles password visibility", () => {
  //     render(
  //       <MemoryRouter>
  //         <Signin />
  //       </MemoryRouter>
  //     );

  //     const passwordInput = screen.getByPlaceholderText("******");
  //     const toggleButton = screen.getByRole("button", {
  //       name: /toggle password visibility/i,
  //     });

  //     // Initially, the password input type should be "password"
  //     expect(passwordInput).toHaveAttribute("type", "password");

  //     // Click the toggle button to show the password
  //     fireEvent.click(toggleButton);
  //     expect(passwordInput).toHaveAttribute("type", "text");

  //     // Click the toggle button again to hide the password
  //     fireEvent.click(toggleButton);
  //     expect(passwordInput).toHaveAttribute("type", "password");
  //   });

  //   it("displays a success toast and navigates on successful login", async () => {
  //     mockedAxios.post.mockResolvedValueOnce({
  //       data: {
  //         token: "mockToken",
  //         userId: "mockUserId",
  //       },
  //     });

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <Signin />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
  //       target: { value: "test@example.com" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("******"), {
  //       target: { value: "password123" },
  //     });

  //     fireEvent.click(screen.getByText("Log in"));

  //     await waitFor(() => {
  //       expect(mockedAxios.post).toHaveBeenCalledWith(
  //         "http://localhost:8000/api/v1/auth/login",
  //         { email: "test@example.com", password: "password123" }
  //       );
  //       expect(localStorage.getItem("token")).toBe("mockToken");
  //       expect(localStorage.getItem("userId")).toBe("mockUserId");
  //       expect(screen.getByText("Login successful! Redirecting...")).toBeInTheDocument();
  //       expect(mockNavigate).toHaveBeenCalledWith("/todos");
  //     });
  //   });

  //   it("displays an error toast on failed login", async () => {
  //     mockedAxios.post.mockRejectedValueOnce({
  //       response: {
  //         data: { message: "Invalid credentials" },
  //       },
  //     });

  //     render(
  //       <MemoryRouter>
  //         <ToastContainer />
  //         <Signin />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
  //       target: { value: "wrong@example.com" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("******"), {
  //       target: { value: "wrongpassword" },
  //     });

  //     fireEvent.click(screen.getByText("Log in"));

  //     await waitFor(() => {
  //       expect(mockedAxios.post).toHaveBeenCalledWith(
  //         "http://localhost:8000/api/v1/auth/login",
  //         { email: "wrong@example.com", password: "wrongpassword" }
  //       );
  //       expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  //     });
  //   });
});
