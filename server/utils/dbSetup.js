import mongoose from "mongoose";
import serverConfig from "../config";

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(serverConfig.mongoURI, { useMongoClient: true }, err => {
    if (err) {
      console.log("MongoDB not connected");
    } else {
      console.log(`MongoDB connected at ${serverConfig.mongoURI}`);
    }
  });
};
