const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/pending-owners', async (req, res) => {
  const owners = await User.find({ role: 'owner', approved: false });
  res.json(owners);
});

router.post('/approve-owner/:id', async (req, res) => {
  const owner = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(owner);
});

module.exports = router;
