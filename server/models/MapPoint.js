const mongoose = require('mongoose');

const mapPointSchema = new mongoose.Schema({
  description: String,
  pos: Array,
}, {
  timestamps: true
});

const MapPoint = mongoose.model('MapPoint', mapPointSchema);

module.exports = MapPoint;
