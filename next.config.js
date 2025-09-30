const { createNextConfig } = require("@agusmgarcia/react-essentials-commands");

module.exports = (phase) => ({
  ...createNextConfig("app")(phase),
  webpack: (config) => {
    config.module.rules.push({
      generator: {
        filename: "static/json/[name].[hash][ext]",
      },
      test: /\.json$/,
      type: "asset/resource",
    });

    return config;
  },
});
