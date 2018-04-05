import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";

// Webpack Requirements
import webpack from "webpack";
import config from "../webpack.config.dev.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

// Initialize the Express app
const app = new express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === "development") {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      colors: true,
      publicPath: config.output.publicPath,
      headers: { "Access-Control-Allow-Origin": "*" }
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// React and Redux setup
import { configureStore } from "../client/store";
import { Provider } from "react-redux";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { getLoadableState } from "loadable-components/server";
import { Helmet } from "react-helmet";
import AppContainer from "../client/AppContainer";

// Import required modules
import serverConfig from "./config";

// MongoDB connection
mongoose.connect(serverConfig.mongoURI, { useMongoClient: true }, err => {
  if (err) {
    console.log("MongoDB not connected");
  } else {
    console.log(`MongoDB connected at ${serverConfig.mongoURI}`);
  }
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(express.static(path.resolve(__dirname, "../dist")));

// Render Initial HTML
const renderFullPage = (html, initialState, loadableState) => {
  // Import Manifests
  const assetsManifest =
    process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest =
    process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);
  const helmet = Helmet.renderStatic();
  return `
    <!DOCTYPE HTML>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        ${process.env.NODE_ENV === "production"
          ? `<link rel="stylesheet" href="${assetsManifest["/app.css"]}" />`
          : ""}
        <link href="https://fonts.googleapis.com/css?family=Lato:400,300,700" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === "production"
            ? `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>`
            : ""}
        </script>
        ${loadableState.getScriptTag()}
        <script src='${process.env.NODE_ENV === "production"
          ? assetsManifest["/vendor.js"]
          : "/vendor.js"}'></script>
        <script src='${process.env.NODE_ENV === "production"
          ? assetsManifest["/app.js"]
          : "/app.js"}'></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </body>
    </html>
  `;
};

// Server side Rendering based on routes matched by react-router
app.get("*", async (req, res, next) => {
  const store = configureStore();
  const context = {};
  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <AppContainer />
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    return res.redirect(context.url);
  }

  const finalState = store.getState();
  const loadableState = await getLoadableState(appWithRouter);
  const initialView = renderToString(appWithRouter)
  res
    .set("Content-Type", "text/html")
    .status(200)
    .end(renderFullPage(initialView, finalState, loadableState));
});

app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
