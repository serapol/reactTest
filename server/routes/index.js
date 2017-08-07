const express = require("express");
const apiRoutes = require("./api");

const router = express.Router();

module.exports = function(app, passport) {
  router.use("/api", apiRoutes(app, passport));

  return router;
};
