const config = {
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/adblocker-app",
  expressSessionSecret: "alexsmith11totraviskelce87"
};

export default config;
