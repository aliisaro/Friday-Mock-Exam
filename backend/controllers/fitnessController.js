const mongoose = require("mongoose");
const Fitness = require("../models/fitnessModel");

//get all fitness data
const getFitness = async (req, res) => {
  const user_id = req.user._id;
  try {
    const fitness = await Fitness.find({ user_id }).sort({ createAt: -1 });
    res.status(200).json(fitness);
  } catch (error) {
    res.status(500).json({ errror: "Server Error" });
  }
};

//Add fitness data
const addFitness = async (req, res) => {
  const { title, date, duration, caloriesBurned } = req.body;

  try {
    const user_id = req.user._id;
    const newFitness = new Fitness({
      title,
      date,
      duration,
      caloriesBurned,
      user_id,
    });
    await newFitness.save();
    res.status(201).json(newFitness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//Get fitness by id
const getFitnessById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error:"No fitness data with that id"});
  }

  try {
    const user_id = req.user._id;
    const fitness = await Fitness.findById(id).where("user_id").equals(user_id);
    if (!fitness) {
      return res.status(404).json({message: "No fitness data with that id"});
    }
    res.status(200).json(fitness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//Update fitness data by id
const updateFitness = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const fitness = await Fitness.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!fitness) {
      return res.status(404).send({ message: "Fitness data not found" });
    }
    res.status(200).json(fitness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  };
};

//Delete fitness id
const deleteFitness = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const fitness = await Fitness.findOneAndDelete({
      _id: id,
      user_id: user_id,
    });
    if (!fitness) {
      return res.status(404).send({ message: "No fitness data with that id" });
    }
    res.status(200).json({ message: "Fitness data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  };
};

module.exports = {
  getFitness,
  addFitness,
  getFitnessById,
  updateFitness,
  deleteFitness,
};
