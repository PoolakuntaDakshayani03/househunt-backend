const express = require('express');
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getOwnerProperties
} = require('../controllers/propertyController');

const router = express.Router();

// ✅ Get all properties
router.get('/', getAllProperties);

// ✅ Get single property by ID
router.get('/:id', getPropertyById);

// ✅ Get properties by owner ID
router.get('/owner/:ownerId', getOwnerProperties);

// ✅ Add new property
router.post('/', addProperty);

// ✅ Update property by ID
router.put('/:id', updateProperty);

// ✅ Delete property by ID
router.delete('/:id', deleteProperty);

module.exports = router;
