const express = require('express');
const authMiddleware = require('./middleware/auth');
const { requireScopes } = require('./middleware/authorization');

const app = express();
const port = 3000;
const protectedRouter = express.Router();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', phase: 'phase-3' });
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'AI Assistant', phase: 'phase-3', status: 'backend authorization active' });
});

app.get('/api/version', (req, res) => {
  res.json({ version: '0.1.0', phase: 'phase-3' });
});

protectedRouter.use(authMiddleware);

protectedRouter.get('/user/profile', requireScopes(['read:profile']), (req, res) => {
  const userId = req.auth && typeof req.auth.user_id === 'string' ? req.auth.user_id : 'user-123';

  res.json({
    id: userId,
    email: 'user@example.com',
    full_name: 'Demo User',
    roles: ['user'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  });
});

protectedRouter.put('/user/profile', requireScopes(['write:profile']), (req, res) => {
  const userId = req.auth && typeof req.auth.user_id === 'string' ? req.auth.user_id : 'user-123';

  res.json({
    id: userId,
    email: req.body && typeof req.body.email === 'string' ? req.body.email : 'user@example.com',
    full_name: req.body && typeof req.body.full_name === 'string' ? req.body.full_name : 'Demo User',
    roles: ['user'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  });
});

protectedRouter.get('/user/preferences', requireScopes(['read:preferences']), (req, res) => {
  res.json({
    language: 'en',
    theme: 'light',
    notifications_enabled: true,
  });
});

protectedRouter.put('/user/preferences', requireScopes(['write:preferences']), (req, res) => {
  res.json({
    language: req.body && typeof req.body.language === 'string' ? req.body.language : 'en',
    theme: req.body && typeof req.body.theme === 'string' ? req.body.theme : 'light',
    notifications_enabled:
      req.body && typeof req.body.notifications_enabled === 'boolean' ? req.body.notifications_enabled : true,
  });
});

protectedRouter.get('/conversations', requireScopes(['read:conversations']), (req, res) => {
  res.json([
    {
      id: 'conv-1',
      title: 'Welcome conversation',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      message_count: 1,
    },
  ]);
});

protectedRouter.post('/conversations', requireScopes(['write:conversations']), (req, res) => {
  const title = req.body && typeof req.body.title === 'string' ? req.body.title : 'New conversation';

  res.status(201).json({
    id: 'conv-new',
    title,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    message_count: 0,
  });
});

protectedRouter.get('/conversations/:id', requireScopes(['read:conversations']), (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    title: `Conversation ${id}`,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    message_count: 2,
  });
});

protectedRouter.delete('/conversations/:id', requireScopes(['write:conversations']), (req, res) => {
  res.status(204).end();
});

protectedRouter.get('/conversations/:id/messages', requireScopes(['read:messages']), (req, res) => {
  const { id } = req.params;

  res.json([
    {
      id: 'msg-1',
      conversation_id: id,
      content: 'Hello, how can I help you?',
      role: 'user',
      created_at: '2024-01-01T00:00:00Z',
    },
  ]);
});

protectedRouter.post('/conversations/:id/messages', requireScopes(['write:messages']), (req, res) => {
  const { id } = req.params;
  const content = req.body && typeof req.body.content === 'string' ? req.body.content : 'Message content';
  const role = req.body && typeof req.body.role === 'string' ? req.body.role : 'user';

  res.status(201).json({
    id: 'msg-new',
    conversation_id: id,
    content,
    role,
    created_at: '2024-01-01T00:00:00Z',
  });
});

protectedRouter.get('/admin/users', requireScopes(['admin:users']), (req, res) => {
  res.json([
    {
      id: 'user-123',
      email: 'user@example.com',
      status: 'active',
    },
  ]);
});

protectedRouter.get('/admin/stats', requireScopes(['admin:read']), (req, res) => {
  res.json({
    users: 1,
    conversations: 1,
    messages: 1,
    uptime_seconds: 0,
  });
});

protectedRouter.put('/admin/users/:id/status', requireScopes(['admin:users']), (req, res) => {
  const { id } = req.params;
  const status = req.body && typeof req.body.status === 'string' ? req.body.status : 'active';

  res.json({
    id,
    email: `${id}@example.com`,
    status,
  });
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
  console.log(`Phase 3 backend running on port ${port}`);
});
