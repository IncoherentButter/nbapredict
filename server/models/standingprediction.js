const mongoose = require("mongoose");

const StandingPredictionSchema = new mongoose.Schema({
  creator_id: String,
  league_id: String,
  predictions: [{type: String}],
});

// compile model from schema
module.exports = mongoose.model("standingprediction", StandingPredictionSchema);
