const HttpStatus = require('../../utils/HttpStatus');

module.exports = ({ cause, message }, _req, res, _next) => res
  .status((cause) ? cause.status : HttpStatus.INTERNAL)
  .json({ message });
