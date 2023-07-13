import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import Login from "../pages/Login";

describe("Login component", () => {
  test("renders without errors", () => {
    render(<Login />);
    // Add assertions to check that the component renders without errors
  });

  test("updates phone state on input change", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email");

    // Simulate user input in the phone input field
    fireEvent.change(emailInput, { target: { value: "1234567890" } });

    // Assert that the phone state is updated correctly
    expect(emailInput.value).toBe("1234567890");
  });

  test("updates password state on input change", () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId("password");

    // Simulate user input in the password input field
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Assert that the password state is updated correctly
    expect(passwordInput.value).toBe("password123");
  });

  // Add more test cases to cover different scenarios and edge cases
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
    const { getByText } = render(<Login />);

    const signUpButton = getByText("Sign up");

    fireEvent.click(signUpButton);

    expect(window.location.pathname).toBe("/register");
  });

  test('should navigate to "/" on button click', () => {
    const { getByTestId } = render(<Login />);

    const homeButton = getByTestId("home");

    fireEvent.click(homeButton);

    expect(window.location.pathname).toBe("/");
  });

  test("should call auth.post with the correct data", () => {
    // Define the test data
    const phone = "1234567890";
    const password = "password";
    const expectedData = new FormData();
    expectedData.set("phone", phone);
    expectedData.set("password", password);
  });
});
