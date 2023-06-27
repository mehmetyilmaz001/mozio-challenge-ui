import React from "react";
import { render } from "@testing-library/react";
import AppCard from ".";

describe("AppCard component", () => {
  it("renders children correctly", () => {
    const children = <div>Test Children</div>;
    const { getByText } = render(<AppCard>{children}</AppCard>);
    const childrenElement = getByText("Test Children");
    expect(childrenElement).toBeInTheDocument();
  });

  it("renders with correct class name", () => {
    const children = <div>Test Children</div>;
    const { container } = render(<AppCard>{children}</AppCard>);
    const cardElement = container.querySelector(".app-card");
    expect(cardElement).toBeInTheDocument();
  });

  it("renders with correct padding style", () => {
    const children = <div>Test Children</div>;
    const { container } = render(<AppCard>{children}</AppCard>);
    const cardElement = container.querySelector(".app-card");
    expect(cardElement).toHaveStyle("padding: 40px");
  });
});
