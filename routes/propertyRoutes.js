const express = require('express');
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getOwnerProperties,
} = require('../controllers/propertyController');
const verifyToken = require('../middleware/verifyToken');

// Route to add a property (used by owner)
router.post('/', verifyToken, addProperty);

// Get all properties (for renters/public)
router.get('/', getAllProperties);

// Get specific property by ID
router.get('/:id', getPropertyById);

// Update property
router.put('/:id', verifyToken, updateProperty);

// Delete property
router.delete('/:id', verifyToken, deleteProperty);

// Get properties by logged-in owner (protected route)
router.get('/owner/:ownerId', verifyToken, getOwnerProperties);

module.exports = router;
