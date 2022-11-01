const { configAuthorization } = require('../../utils/Auth');

const errorMessage = 'Token must be a valid token';

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error(errorMessage);

  try {
    const { data: { user: { role } } } = configAuthorization.verifyAuth(authorization);
    if (role !== 'administrator') throw new Error(errorMessage);
    console.log(role);
  } catch (error) {
    console.log(error)
    throw new Error(errorMessage);
  };
  next();
};

module.exports = validateToken;
