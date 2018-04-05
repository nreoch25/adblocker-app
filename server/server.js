import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import logger from "morgan";
import multer from "multer";
import path from "path";
import dbSetup from "./utils/dbSetup";
import devServer from "./utils/devServer";
import reactApp from "./utils/reactApp";
import serverConfig from "./config";
import images from "./controllers/images";
// Initialize the Express app
const app = new express();
// Run Webpack dev server in development mode
devServer(app);
// MongoDB connection
dbSetup();
// Express Middleware
app.use(logger("dev"));
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(multer({ dest: "uploads/"}).single("adImage"));
app.use(express.static(path.resolve(__dirname, "../dist")));
// Initialize router
const router = express.Router();
images.setRouting(router);
app.use(router);
// React application
app.get("*", reactApp);
// Start Express server
app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
