const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    path: require.resolve('path-browserify'),
    fs: false
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_ALCHEMY_API_KEY': JSON.stringify(process.env.REACT_APP_ALCHEMY_API_KEY),
      'process.env.REACT_APP_ALCHEMY_URL': JSON.stringify(process.env.REACT_APP_ALCHEMY_URL),
    })
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  
  // Exclude brotli from processing
  config.module.rules.push({
    test: /node_modules\/brotli/,
    use: 'null-loader'
  });

  return config;
}