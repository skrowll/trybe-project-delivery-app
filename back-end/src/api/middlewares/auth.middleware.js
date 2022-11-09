const { configAuthorization } = require('../../utils/Auth');
const HttpStatus = require('../../utils/HttpStatus');

const errorMessage = 'Token must be a valid token';

const validateAdminToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });

  try {
    const { data: { user: { role } } } = configAuthorization.verifyAuth(authorization);

    if (role !== 'administrator') {
      throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });
    }
  } catch (error) {
    throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });
  try {
    const { data: { user } } = configAuthorization.verifyAuth(authorization);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });
  }
};

module.exports = { validateAdminToken, validateToken };
