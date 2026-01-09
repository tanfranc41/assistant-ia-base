function decodeTokenPayload(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.trim()) {
    return null;
  }

  const normalizedHeader = authHeader.trim();

  if (!normalizedHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = normalizedHeader.slice('Bearer '.length).trim();

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

  const isObjectPayload = parsedPayload && typeof parsedPayload === 'object' && !Array.isArray(parsedPayload);
  const hasScopesArray = isObjectPayload && Array.isArray(parsedPayload.scopes);

  if (!hasScopesArray) {
    return null;
  }

  const normalizedScopes = parsedPayload.scopes
    .filter((scope) => typeof scope === 'string')
    .map((scope) => scope.trim())
    .filter(Boolean);

  return { ...parsedPayload, scopes: normalizedScopes };
}

function hasRequiredScopes(grantedScopes, requiredScopes) {
  if (!Array.isArray(grantedScopes)) {
    return false;
  }

  if (!Array.isArray(requiredScopes) || requiredScopes.length === 0) {
    return false;
  }

  return requiredScopes.every((requiredScope) => grantedScopes.includes(requiredScope));
}

function requireScopes(requiredScopes) {
  return (req, res, next) => {
    const payload = req.auth;

    if (!payload || !Array.isArray(payload.scopes)) {
      return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' });
    }

    if (!hasRequiredScopes(payload.scopes, requiredScopes)) {
      return res.status(403).json({ error: 'forbidden', message: 'Insufficient scope' });
    }

    next();
  };
}

module.exports = {
  requireScopes,
  decodeTokenPayload,
};
