const express = require("express");
const MapPoint = require("../../models/MapPoint");

const router = express.Router();

module.exports = function(app, passport) {
  router.get("/map-points",
    passport.authenticate('jwt'),
    (req, res, next) => {
      MapPoint
        .find()
        .then((mapPoints) => res.status(200).json({success: true, data: mapPoints || []}))
        .catch(() => {
          let error = new Error("Load the map points failed");
          error.status = 500;
          return next(error);
        });
    }
  );

  router.post("/map-points",
    passport.authenticate('jwt'),
    (req, res, next) => {
      const mapPoints = req.body.filter((mapPoint) => !mapPoint._id);

      Promise.all(
        mapPoints.map((mapPoint) => MapPoint.create(mapPoint))
      )
      .then(() => {
        res.status(200).json({success: true, notification: 'The map points successfully saved'});
      })
      .catch(() => {
        let error = new Error("Save the map points failed");
        error.status = 500;
        return next(error);
      });
    }
  );

  router.delete("/map-points",
    passport.authenticate('jwt'),
    (req, res, next) => {
      const mapPoints = req.body.filter((mapPoint) => mapPoint._id);

      Promise.all(
        mapPoints.map((mapPoint) => MapPoint.remove(mapPoint))
      )
      .then(() => {
        res.status(200).json({success: true, notification: 'The map points successfully cleared'});
      })
      .catch(() => {
        let error = new Error("CLear the map points failed");
        error.status = 500;
        return next(error);
      });
    }
  );

  return router;
};
