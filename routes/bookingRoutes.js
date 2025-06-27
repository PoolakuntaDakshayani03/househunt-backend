const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get bookings for owner (populate property & renter)
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('property')
      .populate('renter');
    const ownerBookings = bookings.filter(
      b => b.property.owner.toString() === req.params.ownerId
    );
    res.json(ownerBookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Confirm a booking
router.post('/confirm/:id', async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'confirmed' });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to confirm booking' });
  }
});

module.exports = router;
