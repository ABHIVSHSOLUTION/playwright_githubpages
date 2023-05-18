import { expect, test } from "@playwright/test";

test.describe("Sample testing of insurance user api", () => {
  test("Get api", async ({ page, baseURL, request }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });

  test("post request", async ({ baseURL, request, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });

  test("put request", async ({ baseURL, request, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });

  test("delete request", async ({ baseURL, request, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });
});
