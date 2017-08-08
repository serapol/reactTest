/* eslint-disable no-unused-vars */
const express = require("express");
const MapPoint = require("../../models/MapPoint");

const router = express.Router();

module.exports = function(app, passport) {
  router.get("/map-points",
    passport.authenticate('jwt'),
    (req, res, next) => {
      const user = req.user;

      MapPoint
        .find({userId: user.id})
        .then((mapPoints) => res.status(200).json({success: true, data: mapPoints || []}))
        .catch((err) => {
          let error = new Error("Load the map points failed");
          error.status = 500;
          console.error(err);
          return next(error);
        });
    }
  );

  router.post("/map-points",
    passport.authenticate('jwt'),
    (req, res, next) => {
      const user = req.user;
      const mapPoints = req.body.filter((mapPoint) => !mapPoint._id);

      Promise.all(
        mapPoints.map((mapPoint) => MapPoint.create(
          Object.assign({}, mapPoint, { userId: user.id })
        ))
      )
      .then(() => {
        res.status(200).json({success: true, notification: 'The map points successfully saved'});
      })
      .catch((err) => {
        let error = new Error("Save the map points failed");
        error.status = 500;
        console.error(err);
        return next(error);
      });
    }
  );

  router.delete("/map-points",
    passport.authenticate('jwt'),
    (req, res, next) => {
      const user = req.user;
      const mapPoints = req.body.filter(
        (mapPoint) => mapPoint._id && mapPoint.userId === user.id
      );

      Promise.all(
        mapPoints.map((mapPoint) => MapPoint.remove(mapPoint))
      )
      .then(() => {
        res.status(200).json({success: true, notification: 'The map points successfully cleared'});
      })
      .catch((err) => {
        let error = new Error("CLear the map points failed");
        error.status = 500;
        console.error(err);
        return next(error);
      });
    }
  );

  return router;
};
