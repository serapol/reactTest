const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const mapPointsRoutes = require("./map-points.routes");

const router = express.Router();

module.exports = function(app, passport) {
  router.get("/user", (req, res) => {
    res.send("OK");
  });

  router.use("/", userRoutes(app, passport));
  router.use("/", authRoutes(app, passport));
  router.use("/", mapPointsRoutes(app, passport));

  return router;
};
