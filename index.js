const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Simple in-memory user store; cleared when the process restarts. Not for production use.
const users = new Map();

// Always require an explicit secret to avoid accidental weak defaults.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set');
}
const rawPort = process.env.PORT;
const PORT = rawPort === undefined ? 3000 : Number(rawPort);
if (!Number.isInteger(PORT) || PORT <= 0 || PORT > 65535) {
  throw new Error('PORT must be a valid number between 1 and 65535');
}

const isValidUsername = (value) =>
  typeof value === 'string' && /^[a-zA-Z0-9_]{3,30}$/.test(value);

const hasStrongPassword = (value) =>
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /[0-9]/.test(value) &&
  /[^A-Za-z0-9]/.test(value);

const validateCredentials = (username, password, { requireStrongPassword = false } = {}) => {
  const normalizedUsername = typeof username === 'string' ? username.trim() : '';
  const normalizedPassword = typeof password === 'string' ? password.trim() : '';

  if (!normalizedUsername || !normalizedPassword) {
    return { error: 'Username and password are required' };
  }

  if (!isValidUsername(normalizedUsername)) {
    return { error: 'Username must be 3-30 characters (letters, numbers, _)' };
  }

  if (requireStrongPassword) {
    if (normalizedPassword.length < 8) {
      return { error: 'Password must be at least 8 characters' };
    }

    if (!hasStrongPassword(normalizedPassword)) {
      return {
        error: 'Password must include upper, lower, number, and special character',
      };
    }
  }

  return { username: normalizedUsername, password: normalizedPassword };
};

// Register a new user with a hashed password.
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body || {};
  const validationResult = validateCredentials(username, password, { requireStrongPassword: true });
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const safeUsername = validationResult.username;
  const safePassword = validationResult.password;

  if (users.has(safeUsername)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  try {
    const passwordHash = await bcrypt.hash(safePassword, 10);
    users.set(safeUsername, { username: safeUsername, passwordHash });
    return res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration failed:', err.message);
    return res.status(500).json({ error: 'Could not register user' });
  }
});

// Log in an existing user and issue a signed JWT.
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};
  const validationResult = validateCredentials(username, password);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const safeUsername = validationResult.username;
  const safePassword = validationResult.password;

  const user = users.get(safeUsername);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const isValid = await bcrypt.compare(safePassword, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: safeUsername }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error('Login failed:', err.message);
    return res.status(500).json({ error: 'Could not log in' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
