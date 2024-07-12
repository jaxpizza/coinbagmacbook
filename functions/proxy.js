const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url, options } = JSON.parse(event.body);
    
    // Add custom headers based on the target URL
    let headers = { ...options.headers };
    if (url.includes('api.uniswap.org')) {
      headers['Origin'] = 'https://app.uniswap.org';
      headers['Referer'] = 'https://app.uniswap.org/';
    } else if (url.includes('infura.io')) {
      headers['Origin'] = 'https://coinbagmacbook.netlify.app';
      headers['Referer'] = 'https://coinbagmacbook.netlify.app/';
      // Add a custom header to help with rate limiting
      headers['X-Custom-Infura-Token'] = '74a98635df5441ecb1c980e3aa9c63bf';
    }

    const response = await axios({
      url,
      ...options,
      headers,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'An error occurred in the proxy' })
    };
  }
};