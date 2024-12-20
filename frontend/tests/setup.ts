import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as machers from "@testing-library/jest-dom/matchers";

expect.extend(machers);
afterEach(() => {
  cleanup();
});
