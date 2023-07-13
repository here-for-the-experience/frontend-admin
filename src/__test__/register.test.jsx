import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, test, afterAll, beforeAll } from "@jest/globals";
import "@testing-library/jest-dom";
import Register from "../pages/Register";

describe("Register component", () => {
  test("should render input fields correctly", () => {
    const { getByLabelText } = render(<Register />);

    const nameInput = getByLabelText("Name");
    const phoneInput = getByLabelText("Phone");
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");

    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test("should update state on input change", () => {
    const { getByLabelText } = render(<Register />);

    const nameInput = getByLabelText("Name");
    const phoneInput = getByLabelText("Phone");
    const addressInput = getByLabelText("Address");
    const nidInput = getByLabelText("NID Number");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(addressInput, { target: { value: "1234567" } });
    fireEvent.change(nidInput, { target: { value: "4567890" } });

    expect(nameInput.value).toBe("John Doe");
    expect(phoneInput.value).toBe("1234567890");
    expect(addressInput.value).toBe("1234567");
    expect(nidInput.value).toBe("4567890");
  });

  test("should display error message on password mismatch", () => {
    const { getByLabelText, getByText } = render(<Register />);

    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");
    const submitButton = getByText("Signup");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "mismatch" } });
    fireEvent.click(submitButton);
  });

  // Add more tests to cover other aspects of the Register component
});

describe("Register component", () => {
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    // Mock window.location.pathname
    delete window.location;
    window.location = { pathname: "/" };
  });

  afterAll(() => {
    // Restore original window.location
    window.location = originalLocation;
  });

  test('should navigate to "/login" on button click', () => {
    const { getByText } = render(<Register />);

    const loginButton = getByText("Log in");

    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/login");
  });

  test('should navigate to "/" on button click', () => {
    const { getByTestId } = render(<Register />);

    const homeButton = getByTestId("home");

    fireEvent.click(homeButton);

    expect(window.location.pathname).toBe("/");
  });
});
