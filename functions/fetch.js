// Load the Updates.json file from the parent folder
const updates = require('../Updates.json');

exports.handler = async (event) => {
  // Dynamically import node-fetch
  const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

  // Extract the "link" and "name" query parameters from the request
  const { link, name } = event.queryStringParameters || {};

  // If "link" parameter exists, use it as the target URL and ignore "name"
  let targetURL;
  if (link) {
    targetURL = link;
  } else if (name) {
    // Look up the update entry for the given name in the JSON file
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