const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      approved: role === 'owner' ? false : true, // renters auto-approved
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
    res.json({ token, role: newUser.role }); // ✅ return role for consistency
  } catch (err) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.role === 'owner' && !user.approved)
      return res.status(403).json({ error: 'Owner not yet approved by admin' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    // ✅ Include user role in the response
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { registerUser, loginUser };
