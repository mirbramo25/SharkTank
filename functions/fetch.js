// Load the Updates.json file from the parent folder
const updates = require('../Updates.json');

exports.handler = async (event) => {
  // Dynamically import node-fetch
  const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

  // Extract the "name" query parameter from the request
  const { name } = event.queryStringParameters || {};
  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing name query parameter' }),
    };
  }

  // Look up the update entry for the given name
  const updateEntry = updates[name];
  if (!updateEntry || !updateEntry.recap || !updateEntry.recap.recapLink) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: `No update found for "${name}"` }),
    };
  }

  // Use the recapLink as the target URL to fetch
  const targetURL = updateEntry.recap.recapLink;

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