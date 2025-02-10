const fetch = require('node-fetch');

exports.handler = async (event) => {
  const targetURL = 'https://sharktankrecap.com/ilumi-light-bulbs-update-shark-tank-season-5/';

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
      headers: { // Important: Add CORS headers if needed
        'Content-Type': 'text/html', // Set the correct content type
        'Access-Control-Allow-Origin': '*', // Or specify your domain: 'https://yourdomain.com'
        'Access-Control-Allow-Methods': 'GET', // Add other methods if needed
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
