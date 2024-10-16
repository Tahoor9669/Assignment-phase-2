const jwt = require('jsonwebtoken');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user details to the request object for later use
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Helper function to check if the user has a specific role
const hasRole = (role) => (req, res, next) => {
  if (req.user.roles && req.user.roles.includes(role)) {
    next(); // User has the required role, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: `Access denied. ${role} role required.` });
  }
};

module.exports = {
  verifyToken,
  hasRole,
};
