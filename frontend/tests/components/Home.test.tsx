import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/components/Home";
import React from "react";

vi.mock("../../src/components/Navbar", () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>,
}));

describe("Home Component", () => {
  it("renders the Navbar", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("displays the main heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", {
      name: /organize your/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the call-to-action button", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const ctaButton = screen.getByRole("button", {
      name: /start for free/i,
    });
    expect(ctaButton).toBeInTheDocument();
  });

  it("renders the image with alt text", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const image = screen.getByAltText("Todoist app interface");
    expect(image).toBeInTheDocument();
  });

  it("renders the review section with stars", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const stars = screen.getAllByText((_, element) =>
      element?.classList.contains("text-yellow-400")
    );
    expect(stars).toHaveLength(5);
  });
});
