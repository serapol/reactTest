/* eslint-disable no-unused-vars,consistent-return */
const express = require('express');
const jwt = require('jsonwebtoken');
const serverConfig = require('../../../config/server.config');

const router = express.Router();

module.exports = function (app, passport) {
  router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, data) => {
      if (!user) {
        let error = new Error(data.message);
        error.status = 400;
        return next(error);
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      payload.passwordHash = user.passwordHash;
      payload.jwtToken = 'JWT ' + jwt.sign(payload, serverConfig.jwtSecret);

      res.status(200).json({success: true, data: payload});

    })(req, res, next);
  });

  router.get("/logout", (req, res, next) => {
    res.status(200).json({success: true});
  });

  return router;

};
