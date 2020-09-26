
const mongoose = require('mongoose');

const PlayerResultSchema = new mongoose.Schema({
  score : Number,
  targetsAppeared : Number,
  hitPercentage : Number
});

const PlayerResult = mongoose.model('PlayerResult', PlayerResultSchema);

module.exports = PlayerResult;
