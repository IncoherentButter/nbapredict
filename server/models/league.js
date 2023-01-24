const mongoose = require("mongoose");

const LeagueSchema = new mongoose.Schema({
    league_id: String,
    league_name: String,
    league_type: String,
    users: [{type: String}],
});

// compile model from schema
module.exports = mongoose.model("league", LeagueSchema);
