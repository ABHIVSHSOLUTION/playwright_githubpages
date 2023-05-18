import { expect, test } from "@playwright/test";

test.describe.serial("Sample testing of insurance user page", () => {
  const name = "test10";
  const email = "test1@gmail.com";

  test("adding user to table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });
  test("adding1 user to table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });
  test("adding2 user to table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });

  test("edit user to the table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });
  test("edi2t user to the table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });
  test("edit3 user to the table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });

  test("deleting user from table", async ({ baseURL, page }) => {
    await page.goto("https://playwright.dev/docs/test-webserver");
  });
});
