const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware.
 * Reads "Authorization: Bearer <token>" from request headers.
 * Attaches decoded { id } to req.user on success.
 */
const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided. Authorization denied.' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError'
      ? 'Token has expired. Please login again.'
      : 'Invalid token. Authorization denied.';
    return res.status(401).json({ error: message });
  }
};

module.exports = auth;
