exports.handler = async (event) => {
  // Global fetch is assumed to be available (Node.js 18+)

  // Extract the "link" and "name" query parameters from the request
  const { link, name } = event.queryStringParameters || {};

  let targetURL;
  if (link) {
    // Use the "link" parameter as the target URL
    targetURL = link;
  } else if (name) {
    // Only require Updates.json if "name" parameter is provided
    const updates = require('../Updates.json');
    const updateEntry = updates[name];
    if (!updateEntry || !updateEntry.recap || !updateEntry.recap.recapLink) {
      const errorMsg = `No update found for "${name}"`;
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: `
          <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
            <strong>Target URL:</strong> <span>N/A</span>
          </div>
          <div style="padding:10px;">
            <h2>Error: ${errorMsg}</h2>
          </div>
        `,
      };
    }
    targetURL = updateEntry.recap.recapLink;
  } else {
    const errorMsg = 'Missing query parameter: provide either "link" or "name".';
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
          <strong>Target URL:</strong> <span>N/A</span>
        </div>
        <div style="padding:10px;">
          <h2>Error: ${errorMsg}</h2>
        </div>
      `,
    };
  }

  try {
    const response = await fetch(targetURL);
    if (!response.ok) {
      // Capture any error message from the HTTP response
      const errorText = await response.text();
      const outputHtml = `
        <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
          <strong>Target URL:</strong> <span>${targetURL}</span>
        </div>
        <div style="padding:10px;">
          <h2>Error: HTTP status ${response.status}</h2>
          <pre>${errorText}</pre>
        </div>
      `;
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'text/html' },
        body: outputHtml,
      };
    }
    const html = await response.text();
    const outputHtml = `
      <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
        <strong>Target URL:</strong> <span>${targetURL}</span>
      </div>
      ${html}
    `;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': 'https://sharktankups.netlify.app', // Adjust as needed
        'Access-Control-Allow-Methods': 'GET',
      },
      body: outputHtml,
    };
  } catch (error) {
    // Return detailed debugging information along with the target URL
    const outputHtml = `
      <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
        <strong>Target URL:</strong> <span>${targetURL}</span>
      </div>
      <div style="padding:10px;">
        <h2>Error loading content</h2>
        <pre>${error.message}</pre>
        <pre>${error.stack}</pre>
      </div>
    `;
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: outputHtml,
    };
  }
};