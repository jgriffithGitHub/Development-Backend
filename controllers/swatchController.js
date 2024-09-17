const Swatch = require('../models/Swatch');

// Get all swatches for a user
exports.getUserSwatches = async (req, res) => {
  try {
    const swatches = await Swatch.find({ user: req.user._id });
    res.json(swatches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific swatch
exports.getSwatch = async (req, res) => {
  const { id } = req.params;

  try {
    //const swatch = await Swatch.findById(id);
    const swatch = await Swatch.find({app_id: id});

    if (!swatch) {
      return res.status(404).json({ message: 'Swatch not found' });
    }

    res.json(swatch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new swatch
exports.createSwatch = async (req, res) => {
  const { app_id, name, description, quantityType, quantityUnits, image } = req.body;

  try {
    const newSwatch = new Swatch({
	  app_id: app_id,
      description,
      quantityType,
      quantityUnits,
      image,
      user: req.user._id, // Associate with the current logged-in user
    });

    const savedSwatch = await newSwatch.save();
    res.status(201).json(savedSwatch);
  } catch (error) {
    res.status(500).json({ message: 'Server error:: ' + error });
  }
};

// Update a swatch
exports.updateSwatch = async (req, res) => {
  const { id } = req.params;

  try {
	 let swatch = await Swatch.updateOne({app_id: id},
	 	 { app_id: req.body.app_id,
	       description: req.body.description,
	       quantityType: req.body.quantityType, 
	       quantityUnits: req.body.quantityUnits,
	       image: req.body.image });
	 
    res.json(swatch);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error});
  }
};

// Delete a swatch
exports.deleteSwatch = async (req, res) => {
  const { id } = req.params;

  try {
    const swatch = await Swatch.find({app_id: id});

    if (!swatch || swatch.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Swatch not found or unauthorized' });
    }

    await swatch.remove();
    res.json({ message: 'Swatch removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
