import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("should render button with press me", () => {
  render(<App />);

  expect(screen.getByText(/press me/i)).toBeDefined();
});
