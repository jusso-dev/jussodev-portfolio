import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const url = process.env.SCREENSHOT_URL ?? "http://127.0.0.1:3000";
const outputDir = resolve("docs/screenshots");

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: resolve(outputDir, "portfolio-home.png"), fullPage: true });

  for (const [section, filename] of [
    ["sec-1", "subject.png"],
    ["sec-2", "mission-record.png"],
    ["sec-3", "notable-impact.png"],
    ["sec-4", "field-artifacts.png"],
    ["sec-5", "address-disposition.png"],
  ]) {
    await page.locator(`[aria-labelledby="${section}"]`).screenshot({
      path: resolve(outputDir, filename),
    });
  }
} finally {
  await browser.close();
}
