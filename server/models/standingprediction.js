const mongoose = require("mongoose");

const StandingPredictionSchema = new mongoose.Schema({
  user_id: String,
  west_predictions:  [{type: Object}],
  east_predictions:  [{type: Object}],
});

// compile model from schema
module.exports = mongoose.model("standingprediction", StandingPredictionSchema);
