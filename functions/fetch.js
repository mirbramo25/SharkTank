exports.handler = async (event) => {
  const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

  // Extract the "url" query parameter if provided; otherwise, use the default URL.
  const { url: queryUrl } = event.queryStringParameters || {};
  const targetURL =
    queryUrl || 'https://sharktankrecap.com/ilumi-light-bulbs-update-shark-tank-season-5/';

  try {
    const response = await fetch(targetURL);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `HTTP error! status: ${response.status}`,
        }),
      };
    }

    const html = await response.text();

    return {
      statusCode: 200,
      body: html,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': 'https://sharktankups.netlify.app', // Update to your domain if needed
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