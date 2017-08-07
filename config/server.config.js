const path = require("path");
const ip = require("ip");

module.exports = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  jwtSecret: process.env.JWT_SECRET || "secret",
  env: process.env.NODE_ENV || "development",
  host: "localhost",
  ip: ip.address(),
  port: process.env.PORT || 5000,
  base: path.resolve(__dirname, "..")
};
