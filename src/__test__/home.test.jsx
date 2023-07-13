import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, jest } from "@jest/globals";
import Home from "../pages/Home";
import vaccineData from "../vaccineData";

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

describe("Home", () => {
  test("renders table with correct data", () => {
    render(<Home />);

    // Check if the table headers are rendered
    // expect(screen.getByText("Vaccine Center")).toBeInTheDocument();
    expect(screen.getByText("Vaccine Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Operator")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    // Check if the table rows are rendered with the correct data
    vaccineData.forEach((data) => {
      expect(screen.getByText(data.center)).toBeInTheDocument();
      expect(screen.getByText(data.date)).toBeInTheDocument();
      expect(
        screen.getByText(data.status ? "true" : "false")
      ).toBeInTheDocument();
      expect(screen.getByText(data.operator)).toBeInTheDocument();
      expect(screen.getByText(data.certificate_url)).toBeInTheDocument();
    });
  });
});
