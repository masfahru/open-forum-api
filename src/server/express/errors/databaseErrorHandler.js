const DatabaseError = require('../../../utils/errors/databaseError');
const { container } = require('../../../container');

const databaseErrorHandler = (err, req, res, next) => {
  if (err instanceof DatabaseError) {
    // if sentry is set, send the error to sentry
    if (container.get('sentry')) {
      container.get('sentry').captureException(err);
    }
    return res.status(err.statusCode).json({
      status: 'Database Error',
      message: 'Our Engineer is working on it. Please try again later.',
    });
  }
  return next(err);
};
module.exports = databaseErrorHandler;
