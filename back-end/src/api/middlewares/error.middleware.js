const HttpStatus = require('../../utils/HttpStatus');

const errorMiddleware = (error, _req, res, _next) => {
  if (error.cause) {
    return res.status(error.cause.status).json({ error: error.message });
  }

  return res.status(HttpStatus.INTERNAL).json({ error: error.message });
};

module.exports = errorMiddleware;
