exports.handler = async (event) => {
  // Node.js 18+ is assumed for global fetch

  const { link } = event.queryStringParameters || {};

  if (!link) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <div style="padding:10px;">
          <h2>Error: Missing "link" query parameter.</h2>
        </div>
      `,
    };
  }

  try {
    const response = await fetch(link);
    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'text/html' },
        body: `
          <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
            <strong>Target URL:</strong> <span>${link}</span>
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
        'Access-Control-Allow-Origin': 'https://sharktankups.netlify.app',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: html,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <div style="padding: 10px; background: #f0f0f0; border-bottom: 1px solid #ccc;">
          <strong>Target URL:</strong> <span>${link}</span>
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