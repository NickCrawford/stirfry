const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  runtimeCompiler: true,
  configureWebpack: () => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
        new PrerenderSPAPlugin(
          // Absolute path to compiled SPA
          path.resolve(__dirname, "dist"),
          // List of routes to prerender
          ["/", "/contact", "/about"],
          {
            // options
          }
        )
      ],
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.join(__dirname, 'src')],
          },
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      },
    };
  }
};
