const DatabaseError = require('../../../utils/errors/databaseError');
const loggerSentry = require('../../../utils/logger/sentry');

const databaseErrorHandler = (err, req, res, next) => {
  if (err instanceof DatabaseError) {
    loggerSentry(err);
    return res.status(err.statusCode).json({
      status: 'Database Error',
      message: 'Our Engineer is working on it. Please try again later.',
    });
  }
  return next(err);
};
module.exports = databaseErrorHandler;
