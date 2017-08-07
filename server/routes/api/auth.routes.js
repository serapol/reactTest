"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');
const serverConfig = require('../../../config/server.config');

const router = express.Router();

module.exports = function (app, passport) {
  router.post("/login",
    passport.authenticate('local'),
    (req, res, next) => {
      const user = req.user;
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      payload.passwordHash = user.passwordHash;
      payload.jwtToken = 'JWT ' + jwt.sign(payload, serverConfig.jwtSecret);

      res.status(200).json({success: true, data: payload});
    }
  );

  router.get("/logout", (req, res, next) => {
    res.status(200).json({success: true});
  });

  return router;

};
