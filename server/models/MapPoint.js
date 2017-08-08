const mongoose = require('mongoose');

const mapPointSchema = new mongoose.Schema({
  description: String,
  pos: Array,
  userId: String,
}, {
  timestamps: true
});

const MapPoint = mongoose.model('MapPoint', mapPointSchema);

module.exports = MapPoint;
