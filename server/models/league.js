const mongoose = require("mongoose");

const LeagueSchema = new mongoose.Schema({
    creator_id: String,
    league_name: String,
    league_password: String,
    league_type: String,
    users: [{type: String}],
});

// compile model from schema
module.exports = mongoose.model("league", LeagueSchema);
