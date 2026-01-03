const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required to verify tokens.');
}

if (JWT_SECRET.length < 16) {
  throw new Error('JWT_SECRET must be at least 16 characters long.');
}

app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      !decoded ||
      typeof decoded !== 'object' ||
      typeof decoded.username !== 'string'
    ) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const username = decoded.username.trim();

    if (!username) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = { username };
    next();
  } catch (err) {
    console.error('JWT verification failed');
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ username: req.user.username });
});

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
