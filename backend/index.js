const http = require('http');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET;
const hasMinimumLength = JWT_SECRET && JWT_SECRET.length >= 32;
const hasMixedCharacters =
  typeof JWT_SECRET === 'string' &&
  /[A-Za-z]/.test(JWT_SECRET) &&
  /[0-9]/.test(JWT_SECRET) &&
  /[^A-Za-z0-9]/.test(JWT_SECRET);

if (!hasMinimumLength || !hasMixedCharacters) {
  throw new Error(
    'JWT_SECRET must be set, at least 32 characters long, and include letters, numbers, and special characters for entropy',
  );
}

const isProduction = process.env.NODE_ENV === 'production';
const TWENTY_FOUR_HOURS_IN_SECONDS = 86_400;
const parsedTtl = parseInt(process.env.JWT_TTL, 10);
const TOKEN_TTL_SECONDS =
  Number.isFinite(parsedTtl) && parsedTtl > 0
    ? Math.min(parsedTtl, TWENTY_FOUR_HOURS_IN_SECONDS)
    : 3600;
const ONE_MEGABYTE = 1024 * 1024;
const MAX_BODY_SIZE = ONE_MEGABYTE; // 1MB
const PORT = Number(process.env.PORT) || 3001;
const ERROR_CODES = {
  PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
  INVALID_JSON: 'INVALID_JSON',
};

function toBase64Url(value) {
  const buffer =
    typeof value === 'string'
      ? Buffer.from(value, 'utf8')
      : Buffer.from(JSON.stringify(value));
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function fromBase64Url(segment) {
  const padding = (4 - (segment.length % 4)) % 4;
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padding);
  return Buffer.from(base64, 'base64').toString('utf8');
}

function timingSafeEqual(a, b) {
  const aBuf = Buffer.isBuffer(a) ? a : Buffer.from(String(a));
  const bBuf = Buffer.isBuffer(b) ? b : Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function createToken(username) {
  const normalizedUsername = typeof username === 'string' ? username.trim() : '';
  if (!normalizedUsername) {
    throw new Error('Username is required to create token');
  }
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = { username: normalizedUsername, exp: now + TOKEN_TTL_SECONDS };
  const headerSegment = toBase64Url(header);
  const payloadSegment = toBase64Url(payload);
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${headerSegment}.${payloadSegment}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${headerSegment}.${payloadSegment}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }
  const segments = token.split('.');
  if (segments.length !== 3) {
    return null;
  }
  const [headerSegment, payloadSegment, signature] = segments;
  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${headerSegment}.${payloadSegment}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  if (!timingSafeEqual(expectedSignature, signature)) {
    return null;
  }
  try {
    const payload = JSON.parse(fromBase64Url(payloadSegment));
    if (
      !payload ||
      typeof payload.username !== 'string' ||
      payload.username.trim() === ''
    ) {
      return null;
    }
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && payload.exp < now) {
      return null;
    }
    return { username: payload.username.trim() };
  } catch (error) {
    return null;
  }
}

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let rawLength = 0;
    let settled = false;

    const safeResolve = (value) => {
      if (!settled) {
        settled = true;
        resolve(value);
      }
    };

    const safeReject = (error) => {
      if (!settled) {
        settled = true;
        reject(error);
      }
    };

    req.on('data', (chunk) => {
      if (settled) {
        return;
      }
      rawLength += chunk.length;
      if (rawLength > MAX_BODY_SIZE) {
        const err = new Error('Payload too large');
        err.code = ERROR_CODES.PAYLOAD_TOO_LARGE;
        safeReject(err);
        req.pause();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (settled) {
        return;
      }
      if (rawLength === 0) {
        safeResolve({});
        return;
      }
      try {
        const rawBuffer = Buffer.concat(chunks, rawLength);
        safeResolve(JSON.parse(rawBuffer.toString('utf8')));
      } catch (error) {
        const err = new Error('Invalid JSON');
        err.code = ERROR_CODES.INVALID_JSON;
        safeReject(err);
      }
    });
    req.on('error', (err) => safeReject(err));
  });
}

async function handler(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');

  if (req.method === 'POST' && pathname === '/api/auth/login') {
    let body;
    try {
      body = await parseJsonBody(req);
    } catch (error) {
      if (error && error.code === ERROR_CODES.PAYLOAD_TOO_LARGE) {
        sendJson(res, 413, { error: 'Payload too large' });
      } else {
        sendJson(res, 400, { error: 'Invalid JSON body' });
      }
      return;
    }
    const { username } = body || {};
    const normalizedUsername = typeof username === 'string' ? username.trim() : '';
    if (!normalizedUsername) {
      sendJson(res, 400, { error: 'Missing username' });
      return;
    }
    const token = createToken(normalizedUsername);
    sendJson(res, 200, { token, username: normalizedUsername });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/auth/me') {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const payload = verifyToken(token);
    if (!payload) {
      sendJson(res, 401, { error: 'Unauthorized' });
      return;
    }
    sendJson(res, 200, { username: payload.username });
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
}

function createServer() {
  return http.createServer((req, res) => {
    Promise.resolve(handler(req, res)).catch((error) => {
      // eslint-disable-next-line no-console
      const safeError = isProduction
        ? { message: error?.message, code: error?.code }
        : error;
      console.error(safeError);
      if (!res.headersSent) {
        sendJson(res, 500, { error: 'Internal Server Error' });
      } else {
        res.end();
      }
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Authentication backend listening on port ${PORT}`);
  });
}

module.exports = {
  createServer,
  handler,
  createToken,
  verifyToken,
};
