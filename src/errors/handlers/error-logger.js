module.exports = (error, req, res, next) => {
  if (error.shouldLog) {
    console.error(error);
  }
  next(error);
};
