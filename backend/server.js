const express = require('express');

const app = express();
const port = 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', phase: 'phase-2' });
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'AI Assistant', phase: 'phase-2', status: 'backend baseline active' });
});

app.listen(port, () => {
  console.log(`Phase 2 backend running on port ${port}`);
});
