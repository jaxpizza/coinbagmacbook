const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url, options } = JSON.parse(event.body);
    const response = await axios({
      url,
      ...options,
      headers: {
        ...options.headers,
        'Origin': 'https://app.uniswap.org'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: 'An error occurred in the proxy' })
    };
  }
};