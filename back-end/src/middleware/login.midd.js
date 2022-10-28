const errorHandler = (error, _req, res, _next) => {
  // console.log(error.message);
  if (error.message === 'Not found') {
    return res.status(404).json({ message: error.message });
  } else if (error.message) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ error: error.message });
};

// (err, req, res, next) => {
//   if (err.message === 'access denied') {
//     res.status(403);
//     res.json({ error: err.message });
//   }

//   next(err);
// }

module.exports = {
  errorHandler,
};
