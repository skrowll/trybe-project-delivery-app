const { configAuthorization } = require('../../utils/Auth');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error('Token must be a valid token');

  try {
    const { data: { user: { role } } } = configAuthorization.verifyAuth(authorization);
    if (role !== 'administrator') throw new Error('Token must be a valid token');
    console.log(role);
  } catch (error) {
    console.log(error);
    throw new Error('Token must be a valid token');
  };
  next();
};

module.exports = validateToken;
