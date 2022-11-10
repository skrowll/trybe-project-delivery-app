const { configAuthorization } = require('../../utils/Auth');
const HttpStatus = require('../../utils/HttpStatus');

const errorMessage = 'Token must be a valid token';

const validateCustomerToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });

  try {
    const { data: { user: { role } } } = configAuthorization.verifyAuth(authorization);

    if (role !== 'customer') {
      throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });
    }
  } catch (error) {
    throw new Error(errorMessage, { cause: { status: HttpStatus.UNAUTHORIZED } });
  }
  next();
};

module.exports = validateCustomerToken;
