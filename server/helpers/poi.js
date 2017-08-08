/* eslint-disable no-unused-vars */
const request = require('request');
const serverConfig = require('../../config/server.config');

module.exports.findNearbyPOIByType = (type, location) => new Promise((resolve, reject) => {
  let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const key = serverConfig.googleApiKey;
  const [lat, lng] = location;
  const rankby = "distance";

  url += `?key=${key}&location=${lat},${lng}&rankby=${rankby}&type=${type}`;

  request(url, (error, response, body) => {
    if (error) {
      reject(error);
    }

    resolve(JSON.parse(body));
  });
});
