const playwright = require('playwright-aws-lambda');

exports.handler = async function(event, context) {
  let browser = null;
  try {
    browser = await playwright.launchChromium();
    const page = await browser.newPage();

    await page.goto('https://www.nytimes.com/games/connections', { waitUntil: 'networkidle' });

    // Click the "Play" button
    await page.waitForSelector('button[aria-label="Play"]');
    await page.click('button[aria-label="Play"]');

    // Wait for the 16 puzzle elements to load
    await page.waitForSelector('[data-flip-id]', { timeout: 10000 });

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