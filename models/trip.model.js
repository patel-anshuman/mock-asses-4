const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  noOfTravellers: Number,
  budgetPerPerson: Number
},{
  versionKey: false
});

const TripModel = mongoose.model("trip",tripSchema);

module.exports = { TripModel };
