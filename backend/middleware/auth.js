function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.trim()) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }

  const normalizedHeader = authHeader.trim();

  if (!normalizedHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }

  const token = normalizedHeader.slice('Bearer '.length).trim();

  if (!token) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }

  next();
}

module.exports = authMiddleware;
