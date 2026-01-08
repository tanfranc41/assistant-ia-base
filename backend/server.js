const express = require('express');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = 3000;
const protectedRouter = express.Router();

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

protectedRouter.get('/auth/test', (req, res) => {
  res.json({ status: 'ok', auth: 'passed', phase: 'phase-2' });
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
