const express = require('express');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = 3000;
const protectedRouter = express.Router();

function decodeTokenPayload(authorizationHeader) {
  if (!authorizationHeader || !authorizationHeader.trim().startsWith('Bearer ')) {
    return null;
  }

  const token = authorizationHeader.trim().slice('Bearer '.length).trim();

  if (!token) {
    return null;
  }

  let decodedPayload;

  try {
    decodedPayload = Buffer.from(token, 'base64').toString('utf8');
  } catch (err) {
    return null;
  }

  let parsedPayload;

  try {
    parsedPayload = JSON.parse(decodedPayload);
  } catch (err) {
    return null;
  }

  const hasValidUserId = typeof parsedPayload.user_id === 'string' && parsedPayload.user_id.trim().length > 0;
  const hasValidScopes =
    Array.isArray(parsedPayload.scopes) &&
    parsedPayload.scopes.every((scope) => typeof scope === 'string' && scope.trim().length > 0);
  const hasValidExp = typeof parsedPayload.exp === 'number' && Number.isFinite(parsedPayload.exp) && parsedPayload.exp > 0;

  if (!hasValidUserId || !hasValidScopes || !hasValidExp) {
    return null;
  }

  return parsedPayload;
}

function requireScopes(requiredScopes) {
  return (req, res, next) => {
    const payload = decodeTokenPayload(req.headers.authorization);

    if (!payload) {
      return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
    }

    const missingScopes = requiredScopes.filter((scope) => !payload.scopes.includes(scope));

    if (missingScopes.length > 0) {
      return res.status(403).json({ error: 'forbidden', message: 'Insufficient scope' });
    }

    req.auth = payload;
    next();
  };
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', phase: 'phase-2' });
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'AI Assistant', phase: 'phase-2', status: 'backend baseline active' });
});

app.get('/api/version', (req, res) => {
  res.json({ version: '0.1.0', phase: 'phase-2' });
});

protectedRouter.use(authMiddleware);

protectedRouter.get('/user/profile', requireScopes(['read:profile']), (req, res) => {
  res.json({ status: 'ok', profile: 'demo', phase: 'phase-3' });
});

protectedRouter.put('/user/profile', requireScopes(['write:profile']), (req, res) => {
  res.json({ status: 'ok', profile: 'updated', phase: 'phase-3' });
});

protectedRouter.get('/conversations', requireScopes(['read:conversations']), (req, res) => {
  res.json({ status: 'ok', conversations: [], phase: 'phase-3' });
});

protectedRouter.post('/conversations', requireScopes(['write:conversations']), (req, res) => {
  res.status(201).json({ status: 'ok', conversation: { id: 'demo-conversation' }, phase: 'phase-3' });
});

protectedRouter.get('/admin/stats', requireScopes(['admin:read']), (req, res) => {
  res.json({ status: 'ok', stats: { users: 0, conversations: 0 }, phase: 'phase-3' });
});

protectedRouter.get('/auth/test', requireScopes(['auth:test']), (req, res) => {
  res.json({ status: 'ok', auth: 'passed', phase: 'phase-3' });
});

app.use('/api', protectedRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'not_found', message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: 'internal_error', message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Phase 2 backend running on port ${port}`);
});
