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

  let decodedPayload;

  try {
    decodedPayload = Buffer.from(token, 'base64').toString('utf8');
  } catch (err) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }

  let parsedPayload;

  try {
    parsedPayload = JSON.parse(decodedPayload);
  } catch (err) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }

  const isObjectPayload = parsedPayload && typeof parsedPayload === 'object' && !Array.isArray(parsedPayload);

  const hasValidUserId = isObjectPayload && typeof parsedPayload.user_id === 'string' && parsedPayload.user_id.trim().length > 0;
  const hasValidScopes =
    isObjectPayload &&
    Array.isArray(parsedPayload.scopes) &&
    parsedPayload.scopes.every((scope) => typeof scope === 'string' && scope.trim().length > 0);
  const hasValidExp =
    isObjectPayload && typeof parsedPayload.exp === 'number' && Number.isFinite(parsedPayload.exp) && parsedPayload.exp > 0;

  if (!hasValidUserId || !hasValidScopes || !hasValidExp) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
  }

  next();
}

module.exports = authMiddleware;
