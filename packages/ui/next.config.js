module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /thread\.js$/,
      loader: "worker-loader",
      options: {
        name: "static/[hash].worker.js",
        publicPath: "/_next/",
      },
    });
    return config;
  }
}
