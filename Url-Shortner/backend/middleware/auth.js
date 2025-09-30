const jwt = require('jsonwebtoken');

const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await require('../models/Admin').findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin' });
    }
    // res.status(200).json({ message: 'Admin Authenticated' });
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateAdmin };