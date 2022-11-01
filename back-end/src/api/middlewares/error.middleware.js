const errorMiddleware = (err, _req, res, _next) => {
  if (!err.status) {
    return res.status(500).json({
      message: err.message,
      code: 500,
    });
  };

  return res.status(err.status).json({
    message: err.message,
    code: err.status,
  });
}

module.exports = errorMiddleware;
