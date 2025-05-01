import { test, expect } from "@playwright/test";

test("Books to Scrape - Price Boundary Check (0 to 100)", async ({
  page,
}, testInfo) => {
  testInfo.setTimeout(100000);
  await page.goto("https://books.toscrape.com");

  const prices: number[] = [];

  while (true) {
    const pagePrices = await page.$$eval(".product_price .price_color", (els) =>
      els.map((el) => parseFloat(el.textContent!.replace("£", "")))
    );
    prices.push(...pagePrices);

    const nextButton = await page.$(".next > a");
    if (!nextButton) break;

    await Promise.all([
      page.waitForSelector(".product_pod"),
      nextButton.click(),
    ]);
  }

  for (const price of prices) {
    console.log(`Book Price: £${price}`);
    expect(price).toBeGreaterThanOrEqual(0);
    expect(price).toBeLessThanOrEqual(100);
  }

  console.log(
    `\n✅ Checked ${prices.length} book prices. All are within £0–£100.`
  );
});
