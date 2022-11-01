const errorHandler = (error, _req, res, _next) => {
  // if (error.message === 'Invalid email') {
  //   return res.status(404).json({ message: error.message });
  // }

  // if (error.status === 400) {
  //   return res.status(error.status).json({ message: error.message });
  // }

  return res.status(error.cause.status || 500).json({ error: error.message });
};

module.exports = {
  errorHandler,
};
