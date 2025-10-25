const { createNextConfig } = require("@agusmgarcia/react-essentials-commands");

module.exports = (phase) => ({
  ...createNextConfig("app")(phase),
  webpack: (config) => {
    config.module.rules.push({
      generator: {
        filename: "static/json/[name].[hash].json",
      },
      test: /\.ss$/,
      type: "asset/resource",
    });

    return config;
  },
});
