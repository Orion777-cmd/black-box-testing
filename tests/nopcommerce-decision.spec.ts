import { test, expect } from "@playwright/test";

test("Decision Table Test - Logged in, coupon applied, cart ≥ $100", async ({
  page,
}, testInfo) => {

    testInfo.setTimeout(100000);
  
  await page.goto("https://demo.nopcommerce.com/login");
  await page.fill("#Email", "testuser@example.com");
  await page.fill("#Password", "Password123");
  await page.click('button[type="submit"]');

  await page.goto("https://demo.nopcommerce.com/books");
  await page.click("text=Add to cart"); 

  await page.goto("https://demo.nopcommerce.com/cart");

  await page.fill("#discountcouponcode", "SAMPLECOUPON");
  await page.click('button[name="applydiscountcouponcode"]');

  const discountText = await page.textContent(".discount-value");
  expect(discountText).toContain("20%");
});
