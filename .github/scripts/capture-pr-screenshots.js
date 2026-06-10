const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..");
const { chromium } = require(path.join(repoRoot, "apps/web/node_modules/playwright"));

const configPath = process.argv[2] || ".github/pr-screenshots.json";
const outputDir = process.argv[3] || "pr-screenshots";
const captureUrl = process.env.CAPTURE_URL;
const repository = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.PR_NUMBER;
const headSha = process.env.HEAD_SHA;

if (!captureUrl) {
  throw new Error("CAPTURE_URL must be set");
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
fs.mkdirSync(outputDir, { recursive: true });

function getSafeScenarioId(id) {
  if (typeof id !== "string" || !/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(id)) {
    throw new Error(`Invalid screenshot scenario id: ${JSON.stringify(id)}`);
  }

  return id;
}

function buildUrl(baseUrl, routePath) {
  if (!routePath || routePath === "/") {
    return baseUrl;
  }

  return new URL(routePath.replace(/^\/+/, ""), baseUrl).toString();
}

async function applyActions(page, actions = []) {
  for (const action of actions) {
    if (action.clickText) {
      await page.getByRole("button", { name: action.clickText }).click();
    } else if (action.waitForSelector) {
      await page.waitForSelector(action.waitForSelector);
    } else if (action.waitForTimeout) {
      await page.waitForTimeout(action.waitForTimeout);
    } else {
      throw new Error(`Unsupported screenshot action: ${JSON.stringify(action)}`);
    }
  }
}

async function goToWithRetry(page, url) {
  const maxAttempts = Number(process.env.SCREENSHOT_URL_ATTEMPTS || 24);
  const retryDelayMs = Number(process.env.SCREENSHOT_URL_RETRY_DELAY_MS || 5000);
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

      if (!response || !response.ok()) {
        throw new Error(`Unexpected response status ${response?.status() || "unknown"}`);
      }

      return;
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        await page.waitForTimeout(retryDelayMs);
      }
    }
  }

  throw lastError;
}

(async () => {
  const browser = await chromium.launch();
  const screenshots = [];

  for (const scenario of config) {
    const page = await browser.newPage({ viewport: scenario.viewport });
    const scenarioId = getSafeScenarioId(scenario.id);
    const scenarioUrl = buildUrl(captureUrl, scenario.path);
    const fileName = `${scenarioId}.png`;
    const filePath = path.join(outputDir, fileName);

    await goToWithRetry(page, scenarioUrl);
    await applyActions(page, scenario.actions);
    await page.screenshot({ path: filePath, fullPage: Boolean(scenario.fullPage) });
    await page.close();

    screenshots.push({
      id: scenarioId,
      label: scenario.label,
      path: fileName,
      url: scenarioUrl,
      viewport: scenario.viewport,
    });
  }

  await browser.close();

  fs.writeFileSync(path.join(outputDir, "manifest.json"), JSON.stringify({ screenshots }, null, 2));

  if (repository && prNumber && headSha) {
    const branchPath = `pulls/${prNumber}/${headSha}`;
    const rows = screenshots.map((screenshot) => {
      const imageUrl = `https://github.com/${repository}/blob/ci-screenshots/${branchPath}/${screenshot.path}?raw=true`;

      return `| ${screenshot.label} | [![${screenshot.label}](${imageUrl})](${imageUrl}) |`;
    });
    const markdown = [
      "<!-- bergline-pr-screenshots -->",
      "Screenshots:",
      "",
      "| Scenario | Screenshot |",
      "| --- | --- |",
      ...rows,
      "",
    ].join("\n");

    fs.writeFileSync(path.join(outputDir, "comment.md"), markdown);
  }
})();
