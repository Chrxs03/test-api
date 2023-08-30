function logErrors(err, req, res, next) {
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (!err.isBoom) {
    next(err);
  }
  const { output } = err;
  res.status(output.statusCode).json(output.payload);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
