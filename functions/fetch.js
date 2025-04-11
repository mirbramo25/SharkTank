exports.handler = async (event) => {
  // Dynamically import node-fetch
  const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

  // Extract the "link" and "name" query parameters from the request
  const { link, name } = event.queryStringParameters || {};

  let targetURL;
  if (link) {
    // If "link" exists, use it directly
    targetURL = link;
  } else if (name) {
    // Only require Updates.json if "name" parameter is provided
    const updates = require('../Updates.json');
    const updateEntry = updates[name];
    if (!updateEntry || !updateEntry.recap || !updateEntry.recap.recapLink) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `No update found for "${name}"` }),
      };
    }
    targetURL = updateEntry.recap.recapLink;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing query parameter: provide either "link" or "name".' }),
    };
  }

  try {
    const response = await fetch(targetURL);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `HTTP error! status: ${response.status}` }),
      };
    }
    const html = await response.text();
    return {
      statusCode: 200,
      body: html,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': 'https://sharktankups.netlify.app', // Adjust as needed
        'Access-Control-Allow-Methods': 'GET',
      },
    };
  } catch (error) {
    console.error('Error fetching HTML:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error loading content.' }),
    };
  }
};