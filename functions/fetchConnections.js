const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://www.nytimes.com/games/connections', {
      waitUntil: 'domcontentloaded'
    });
    // Wait briefly to allow page elements to load
    await page.waitForTimeout(1000);

    // Handle the "continue" button if present
    const continueButtonSelector = 'button.purr-blocker-card__button';
    if (await page.$(continueButtonSelector)) {
      await page.click(continueButtonSelector);
      await page.waitForTimeout(1000);
    }

    // Click the "play" button
    const playButtonSelector = 'button.pz-moment__button';
    await page.waitForSelector(playButtonSelector);
    await page.click(playButtonSelector);
    await page.waitForTimeout(1000);

    // Evaluate the page to collect the flip IDs
    const flipIds = await page.evaluate(() =>
      Array.from(document.querySelectorAll('label[data-flip-id]'))
        .map(label => label.getAttribute('data-flip-id'))
        .join(';')
    );

    // Return the output string in an HTML response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<html>
              <head><title>Flip IDs</title></head>
              <body>
                <h1>Flip IDs</h1>
                <p>${flipIds}</p>
              </body>
             </html>`
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};