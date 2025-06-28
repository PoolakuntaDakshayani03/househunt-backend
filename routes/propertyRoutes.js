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

router.post('/owner/properties', verifyToken, addProperty);
router.get('/owner/properties', verifyToken, getOwnerProperties);

router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.put('/properties/:id', verifyToken, updateProperty);
router.delete('/properties/:id', verifyToken, deleteProperty);

module.exports = router;
