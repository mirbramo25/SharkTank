const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
  
exports.handler = async function(event, context) {
  let browser = null;
  try {
    // Launch headless Chrome with chrome-aws-lambda settings
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  
    const page = await browser.newPage();
    // Navigate to the NYT Connections page
    await page.goto('https://www.nytimes.com/games/connections', { waitUntil: 'networkidle0' });
    // Wait for the Play button to appear and click it (adjust selector if needed)
    await page.waitForSelector('button[aria-label="Play"]', { timeout: 5000 });
    await page.click('button[aria-label="Play"]');
  
    // Wait for the 16 puzzle items (elements with data-flip-id) to appear
    await page.waitForSelector('[data-flip-id]', { timeout: 10000 });
  
    // Extract the items (change what you extract if needed)
    const items = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('[data-flip-id]'));
      return elements.map(el => el.innerText.trim());
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ items }),
    };
  } catch (error) {
    console.error('Error in fetchConnections:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
