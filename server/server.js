import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import dbSetup from "./utils/dbSetup";
import devServer from "./utils/devServer";
import reactApp from "./utils/reactApp";
import serverConfig from "./config";
// Initialize the Express app
const app = new express();
// Run Webpack dev server in development mode
devServer(app);
// MongoDB connection
dbSetup();
// Express Middleware
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(express.static(path.resolve(__dirname, "../dist")));
// React application
app.get("*", reactApp);
// Start Express server
app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
