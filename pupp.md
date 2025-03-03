Below is a step‑by‑step list of terminal commands you can run on your Mac. (Adjust the directory paths as needed for your setup.)

1. Open Terminal and navigate to your preferred parent folder (for example, ~/Projects):
```
cd ~/Projects
```

2. Clone the repository:
```
git clone https://github.com/mirbramo25/st.git
```

3. Change into the cloned repo’s functions directory (this folder already contains your Netlify package.json):
```
cd st/functions
```

4. Install Puppeteer‑core and chrome‑aws‑lambda as additional dependencies:
```
npm install puppeteer-core chrome-aws-lambda
```

5. Create (or edit) the Netlify function file. Here we’ll create a file named fetchConnections.js:
```
nano fetchConnections.js
```

6. Paste the following code into the editor (this code simulates clicking “Play” and then extracts the 16 items):

```
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
```
7. Save the file and exit nano:

– Press Ctrl+O, then Enter to save, and Ctrl+X to exit.

8. Commit your changes and push them to GitHub:
```
git add fetchConnections.js package.json package-lock.json
```
```
git commit -m "Add Netlify function: fetchConnections with puppeteer-core and chrome-aws-lambda"
```
```
git push origin main
```

9. (Optional) Test locally using Netlify CLI:
```
If you haven’t installed Netlify CLI globally, run:
```
```
npm install -g netlify-cli
```
```
Then, in the repo root (inside st), run:
```
```
netlify dev
```

This will serve your site locally (e.g., at http://localhost:8888) where you can navigate to your static page (such as a conn.html you set up in your repo’s root) that calls the function.

Once you push your changes, Netlify will automatically build and deploy your site. Your static HTML page (for example, conn.html placed in the repo’s root) can then fetch data from your function at /.netlify/functions/fetchConnections.

These commands should work perfectly on your first try if your environment is set up correctly.