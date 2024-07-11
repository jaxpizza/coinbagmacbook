const axios = require('axios');

exports.handler = async function(event, context) {
  const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
  const CMC_API_KEY = process.env.CMC_API_KEY;
  const JENNER_ID = '31798';

  try {
    const response = await axios.get(CMC_API_URL, {
      params: {
        id: JENNER_ID,
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY
      }
    });

    const tokenData = response.data.data[JENNER_ID];
    const formattedData = {
      name: tokenData.name,
      symbol: tokenData.symbol,
      price: tokenData.quote.USD.price,
      marketCap: tokenData.quote.USD.market_cap,
      volume24h: tokenData.quote.USD.volume_24h,
      percentChange1h: tokenData.quote.USD.percent_change_1h,
      percentChange24h: tokenData.quote.USD.percent_change_24h,
      percentChange7d: tokenData.quote.USD.percent_change_7d
    };

    return {
      statusCode: 200,
      body: JSON.stringify(formattedData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch token data' })
    };
  }
};
