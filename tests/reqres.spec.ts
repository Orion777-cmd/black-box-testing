import { test, expect, request } from "@playwright/test";

test.describe("Reqres API - Registration Endpoint", () => {
  const baseURL = "https://reqres.in/api/register";

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  };

  const testCases = [
    {
      name: "Valid email and password",
      body: { email: "eve.holt@reqres.in", password: "pistol" },
      expectedStatus: 200,
    },
    {
      name: "Valid email, missing password",
      body: { email: "eve.holt@reqres.in" },
      expectedStatus: 400,
    },
    {
      name: "Missing email, valid password",
      body: { password: "pistol" },
      expectedStatus: 400,
    },
    {
      name: "Invalid email format, valid password",
      body: { email: "eve.holt[at]reqres.in", password: "pistol" },
      expectedStatus: 400,
    },
    {
      name: "Valid email, empty password",
      body: { email: "eve.holt@reqres.in", password: "" },
      expectedStatus: 400,
    },
    {
      name: "Empty email, valid password",
      body: { email: "", password: "pistol" },
      expectedStatus: 400,
    },
    {
      name: "Missing email and password",
      body: {},
      expectedStatus: 400,
    },
  ];

  for (const testCase of testCases) {
    test(`${testCase.name}`, async ({ request }) => {
      const response = await request.post(baseURL, {
        headers,
        data: testCase.body,
      });

      expect(response.status()).toBe(testCase.expectedStatus);

      const body = await response.json();
      console.log(`${testCase.name}:`, body);
    });
  }
});
