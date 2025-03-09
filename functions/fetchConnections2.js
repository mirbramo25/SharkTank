const playwright = require('playwright-aws-lambda');

exports.handler = async function(event, context) {
  let browser;
  try {
    browser = await playwright.launchChromium({ slowMo: 100 });
    const page = await browser.newPage();

    // Increase navigation timeout to prevent early termination
    await page.goto('https://www.nytimes.com/games/connections', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Click the "Play" button and wait for elements
    await page.waitForSelector('button[aria-label="Play"]', { timeout: 10000 });
    await page.click('button[aria-label="Play"]');

    await page.waitForSelector('[data-flip-id]', { timeout: 15000 });

    const items = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[data-flip-id]')).map(el => el.innerText.trim());
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ items }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  } finally {
    if (browser) await browser.close();
  }
};