import { test, expect } from "@playwright/test";

test("homepage renders the Bergline wordmark", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Bergline");
  await expect(page.getByRole("heading", { level: 1, name: "Bergline" })).toBeVisible();
});
