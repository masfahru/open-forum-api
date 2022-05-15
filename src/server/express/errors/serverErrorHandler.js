const { container } = require('../../../container');
// eslint-disable-next-line no-unused-vars
const serverErrorHandler = (err, req, res, next) => {
  // if sentry is set, send the error to sentry
  if (container.get('sentry')) {
    container.get('sentry').captureException(err);
  }
  res.status(500).json({
    status: 'Server Error',
    message: 'Our Engineer is working on it. Please try again later.',
  });
};
module.exports = serverErrorHandler;
