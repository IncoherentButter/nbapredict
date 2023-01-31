const mongoose = require("mongoose");

const ActualStandingPredictionSchema = new mongoose.Schema({
  west_predictions:  [String],  
  east_predictions:  [String],
});

// compile model from schema
module.exports = mongoose.model("actualStanding", ActualStandingPredictionSchema);
