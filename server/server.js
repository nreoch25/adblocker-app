import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import validator from "express-validator"
import logger from "morgan";
import multer from "multer";
import passport from "passport";
import cors from "cors";
import path from "path";
import dbSetup from "./utils/dbSetup";
import devServer from "./utils/devServer";
import reactApp from "./utils/reactApp";
import serverConfig from "./config";
// Import controllers
import images from "./controllers/images";
import users from "./controllers/users";
// Import connect mongo
const MongoStore = require("connect-mongo")(session);
// Initialize the Express app
const app = new express();
// Run Webpack dev server in development mode
devServer(app);
// MongoDB connection
dbSetup();
// require passport local setup
require("./passport/passport-local");
// Express Middleware
app.use(logger("dev"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(multer({ dest: "uploads/"}).single("adImage"));
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(validator());
// Initialize session store\
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});
app.use(
  session({
    secret: serverConfig.expressSessionSecret,
    cookie: {
      maxAge: 1280000
    },
    resave: true,
    saveUninitialized: false,
    store: sessionStore
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Initialize router
const router = express.Router();
images.setRouting(router);
users.setRouting(router);
app.use(router);
// React application
app.get("*", reactApp);
// Start Express server
app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
