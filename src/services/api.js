import axios from 'axios';

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

export const fetchTokenData = async (symbol) => {
  try {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${API_URL}`, {
      params: {
        symbol: symbol,
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.REACT_APP_CMC_API_KEY
      }
    });

    const tokenData = response.data.data[symbol];
    return {
      price: tokenData.quote.USD.price,
      marketCap: tokenData.quote.USD.market_cap,
      volume24h: tokenData.quote.USD.volume_24h,
      percentChange1h: tokenData.quote.USD.percent_change_1h,
      percentChange24h: tokenData.quote.USD.percent_change_24h,
      percentChange7d: tokenData.quote.USD.percent_change_7d
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};