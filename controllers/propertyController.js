const Property = require('../models/Property');

// Create a new property (owner is taken from token)
const addProperty = async (req, res) => {
  try {
    const { title, location, rent } = req.body;

    const prop = new Property({
      title,
      location,
      rent,
      owner: req.user.id, // ✅ Owner from token
    });

    await prop.save();
    res.status(201).json(prop);
  } catch (err) {
    console.error('Add Property Error:', err);
    res.status(500).json({ error: 'Failed to add property' });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (err) {
    console.error('Get All Properties Error:', err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    console.error('Get Property By ID Error:', err);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update Property Error:', err);
    res.status(500).json({ error: 'Failed to update property' });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    console.error('Delete Property Error:', err);
    res.status(500).json({ error: 'Failed to delete property' });
  }
};

// Get properties owned by the logged-in owner (no ownerId in params)
const getOwnerProperties = async (req, res) => {
  try {
    const ownerId = req.user.id; // ✅ Secure from token
    const properties = await Property.find({ owner: ownerId });
    res.json(properties);
  } catch (err) {
    console.error('Get Owner Properties Error:', err);
    res.status(500).json({ error: 'Error fetching owner properties' });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getOwnerProperties,
};
