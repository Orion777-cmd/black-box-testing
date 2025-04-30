import { test, expect } from "@playwright/test";

test("End-to-End Use Case: Add to Cart → Checkout → Confirm Order", async ({
  page,
}, testInfo) => {
    testInfo.setTimeout(100000);
  await page.goto("https://demo.nopcommerce.com");

  await page.waitForSelector('a:has-text("Books")', { state: "visible" });
  await page.click('a:has-text("Books")');
  await page.click(
    'text=Fahrenheit 451 by Ray Bradbury >> xpath=..//input[@value="Add to cart"]'
  );

  await page.click("text=Shopping cart");

  await page.check("#termsofservice");
  await page.click("#checkout");

  await page.fill("#Email", "abiy.biru78@gmail.com");
  await page.fill("#Password", "Password@123");
  await page.click("button.login-button");


  await page.click("button.new-address-next-step-button");
  await page.click("button.shipping-method-next-step-button");
  await page.click("button.payment-method-next-step-button");
  await page.click("button.payment-info-next-step-button");
  await page.click("button.confirm-order-next-step-button"); 

  const confirmation = await page.textContent(".title");
  expect(confirmation).toContain("Your order has been successfully processed!");
  console.log("✅ Order confirmed successfully");
});
