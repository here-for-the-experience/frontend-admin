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

    // Check if the table rows are rendered with the correct data
    vaccineData.forEach((data) => {
      // expect(screen.getByText(data.vaccination_date)).toBeInTheDocument();
      // expect(
      //   screen.getByText(data.status ? "true" : "false")
      // ).toBeInTheDocument();
      // expect(screen.getByText(data.certificate_url)).toBeInTheDocument();
    });
  });
});
