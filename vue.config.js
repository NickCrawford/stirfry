var path = require("path");

const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// // vue.config.js
module.exports = {
  configureWebpack: {
    // externals: {
    //   oimo: false,
    //   cannon: true,
    //   earcut: false
    // },
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/", "/about", "/contact"],

        renderer: new Renderer({
          inject: {
            foo: "bar"
          },
          headless: false,
          renderAfterDocumentEvent: "render-event"
        })
      })
    ]
  }
};
