import { test, expect } from "@playwright/test";

const validEmail = "testuser@example.com";
const validPassword = "Password123"; 
const invalidPassword = "wrongpassword";

test.describe("State Transition Testing - Login Page", () => {
  test("S1 → S2: Valid Login transitions to Success state", async ({
    page,
  }, testInfo) => {
    testInfo.setTimeout(100000);
    await page.goto("https://demo.nopcommerce.com/login");

    await page.fill("#Email", validEmail);
    await page.fill("#Password", validPassword);
    await page.click("button.login-button");

    await expect(page).toHaveURL("https://demo.nopcommerce.com/");
    console.log("✅ Transitioned to Success state (S2)");
  });

  test("S1 → S3: Invalid login shows error (Failed state)", async ({
    page,
  }, testInfo) => {
    testInfo.setTimeout(100000);
    await page.goto("https://demo.nopcommerce.com/login");

    await page.fill("#Email", validEmail);
    await page.fill("#Password", invalidPassword);
    await page.click("button.login-button");

    const errorMessage = await page.textContent(".message-error");
    expect(errorMessage).toContain("Login was unsuccessful");
    console.log("✅ Transitioned to Failed state (S3)");
  });

  test("S1 → S3 repeatedly (check for lockout or rate limit)", async ({
    page,
  }, testInfo) => {
    testInfo.setTimeout(200000);
    for (let i = 0; i < 10; i++) {
      await page.goto("https://demo.nopcommerce.com/login");
      await page.fill("#Email", validEmail);
      await page.fill("#Password", "wrongpassword" + i);
      await page.click("button.login-button");
      await page.waitForTimeout(1000); 
    }

    const errorMessage = await page.textContent(".message-error");
    console.log("🔁 Multiple failed attempts: ", errorMessage);

    // Optional: add assertion if lockout message appears
    expect(errorMessage).toContain('locked')
  });
});
