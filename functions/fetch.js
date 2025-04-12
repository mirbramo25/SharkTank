exports.handler = async (event) => {
  // Node.js 18+ is assumed for global fetch

  const { link, name } = event.queryStringParameters || {};

  let targetURL;
  if (link) {
    targetURL = link;
  } else if (name) {
    const updates = require('../Updates.json');
    const updateEntry = updates[name];
    if (!updateEntry || !updateEntry.recap || !updateEntry.recap.recapLink) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: `
          <div style="padding:10px;">
            <h2>Error: No update found for "${name}"</h2>
          </div>
        `,
      };
    }
    targetURL = updateEntry.recap.recapLink;
  } else {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <div style="padding:10px;">
          <h2>Error: Missing query parameter. Provide either "link" or "name".</h2>
        </div>
      `,
    };
  }

  try {
    const response = await fetch(targetURL);
    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'text/html' },
        body: `
          <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
            <strong>Target URL:</strong> <span>${targetURL}</span>
          </div>
          <div style="padding:10px;">
            <h2>Error: HTTP status ${response.status}</h2>
            <pre>${errorText}</pre>
          </div>
        `,
      };
    }

    const html = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': 'https://sharktankups.netlify.app', // Adjust as needed
        'Access-Control-Allow-Methods': 'GET',
      },
      body: html, // clean passthrough without any wrapping or debug info
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
          <strong>Target URL:</strong> <span>${targetURL}</span>
        </div>
        <div style="padding:10px;">
          <h2>Error loading content</h2>
          <pre>${error.message}</pre>
          <pre>${error.stack}</pre>
        </div>
      `,
    };
  }
};