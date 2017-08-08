/* eslint-disable no-unused-vars */
const express = require("express");
const { findNearbyPOIByType } = require("../../helpers/poi");

const router = express.Router();

module.exports = function(app, passport) {
  router.post("/poi",
    passport.authenticate('jwt'),
    (req, res, next) => {
      const data = req.body;

      findNearbyPOIByType(data.type, data.location)
        .then((data) => {
          const poi = data.results.map((poiData) => {
            const { geometry: { location } } = poiData;

            return {
              pos: [location.lat, location.lng],
              description: poiData.name,
              icon: poiData.icon
            };
          });

          res.status(200).json({success: true, data: poi});
        })
        .catch((err) => {
          let error = new Error("Load the poi failed");
          error.status = 500;
          console.error(err);
          return next(error);
        });
    }
  );

  return router;
};
