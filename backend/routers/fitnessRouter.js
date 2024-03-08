const express = require('express');
const router = express.Router();
const { getFitness, addFitness, getFitnessById, deleteFitness, updateFitness } = require('../controllers/fitnessController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all routes
router.use(requireAuth)

// GET all Fitness
router.get('/', getFitness);

// POST a new Fitness
router.post('/', addFitness);

// GET a single Fitness
router.get('/:id', getFitnessById);

// DELETE a Fitness
router.delete('/:id', deleteFitness);

// Update Fitness using PUT
router.put('/:id', updateFitness);

module.exports = router;