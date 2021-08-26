module.exports = (error, req, res, next) => {
  let statusCode = null;
  const errors = require('../types');

  switch (error.constructor) {
    case errors.DataNotFoundError:
      statusCode = 404;
      break;
    case errors.DataInvalidError:
      statusCode = 422;
      break;
  }

  if (statusCode) {
    res.status(statusCode).json({error: error.message});
  } else {
    next(error);
  }
};
