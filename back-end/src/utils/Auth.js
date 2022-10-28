require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = { expiresIn: '5d', algorithm: 'HS256' };

const configAuthorization = {
  signAuth: (user) => jwt.sign({ data: { user } }, JWT_SECRET, jwtConfig),
  verifyAuth: (payload) => jwt.verify(payload, JWT_SECRET),
};

module.exports = {
  configAuthorization,
};
