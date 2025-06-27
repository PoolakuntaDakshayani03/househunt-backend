const Property = require('../models/Property');

// Create a new property
const addProperty = async (req, res) => {
  try {
    const prop = new Property(req.body);
    await prop.save();
    res.status(201).json(prop);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add property' });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (err) {
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
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update property' });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete property' });
  }
};

// Get properties owned by a specific owner
const getOwnerProperties = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const properties = await Property.find({ owner: ownerId });
    res.json(properties);
  } catch (err) {
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
