import React from "react";
import { render } from "@testing-library/react";
import PublicLayout from ".";

describe("PublicLayout component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <PublicLayout>
        <div>Test Children</div>
      </PublicLayout>
    );
    const childrenElement = getByText("Test Children");
    expect(childrenElement).toBeInTheDocument();
  });

  it("renders with correct class name", () => {
    const { container } = render(
      <PublicLayout>
        <div>Test Children</div>
      </PublicLayout>
    );
    const layoutElement = container.querySelector(".public-layout");
    expect(layoutElement).toBeInTheDocument();
  });
});