import { describe, it, expect } from "vitest";
import { Button } from "./button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("should render", () => {
    render(<Button />);
    expect(screen.queryByText("Click me")).toBeTruthy();
  });
});
