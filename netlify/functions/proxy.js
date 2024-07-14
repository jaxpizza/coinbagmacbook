const https = require('https');

exports.handler = async (event, context) => {
  const path = event.path.replace(/^\/\.netlify\/functions\/proxy/, '');
  const url = `https://api.uniswap.org${path}`;

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({
          statusCode: 200,
          body: data,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      });
    }).on('error', (error) => {
      reject({ statusCode: 500, body: error.message });
    });
  });
};