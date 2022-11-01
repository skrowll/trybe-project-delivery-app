const HttpStatus = require('../../utils/HttpStatus');

const errorMiddleware = (error, _req, res, _next) => res
  .status(error.cause.status || HttpStatus.INTERNAL).json({ error: error.message });
  
module.exports = errorMiddleware;
