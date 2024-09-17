const express = require('express');
const { getUserSwatches, getSwatch, createSwatch, updateSwatch, deleteSwatch } = require('../controllers/swatchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all swatches for the logged-in user
router.get('/', protect, getUserSwatches);

// Get a specific swatch 
router.get('/:id', protect, getSwatch);

// Create a new swatch
router.post('/', protect, createSwatch);

// Update a swatch
router.put('/:id', protect, updateSwatch);

// Delete a swatch
router.delete('/:id', protect, deleteSwatch);

module.exports = router;
