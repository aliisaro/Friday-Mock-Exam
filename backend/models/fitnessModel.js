const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
  },
  user_id: {
    type: String,
    required: true,
  },

},{timestamps: true});

module.exports = mongoose.model("Fitness", fitnessSchema);
