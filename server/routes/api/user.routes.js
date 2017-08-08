/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const User = require("../../models/User");

module.exports = function () {
  router.post("/user", (req, res, next) => {
    const user = req.body;

    if (!user.name || !user.email || !user.password) {
      let error = new Error("Name, email, and password required");
      error.status = 400;
      return next(error);
    }

    if (user.password !== user.confirmPassword) {
      let error = new Error("Passwords must match");
      error.status = 400;
      return next(error);
    }

    let newUser = {
      email: user.email,
      name: user.name,
      password: user.password
    };

    User.findOne({ email: user.email })
      .then((user) => {
        if (user) {
          let error = new Error("User already exist");
          error.status = 400;
          return next(error);
        }

        User.create(newUser, (error, user) => {
          if (error) {
            return next(error);
          }

          res.status(200).json({ success: true, notification: `Success, you're registered ${ user.email }`, data: user });
        });
      });
  });

  return router;
};
