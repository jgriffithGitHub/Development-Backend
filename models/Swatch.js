const mongoose = require('mongoose');

const swatchSchema = new mongoose.Schema({
  app_id: { type: String, required: false },
  description: { type: String, required: false },
  quantityType: { type: String, enum: ['odd size', 'fat quarter', 'bolt', 'yard'], required: true },
  quantityUnits: { type: Number, required: true },
  image: { type: String, required: false }, // URL or file path for image
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user who owns the swatch
}, {
  timestamps: true,
});

const Swatch = mongoose.model('Swatch', swatchSchema);

module.exports = Swatch;
