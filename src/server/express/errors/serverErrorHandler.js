const loggerSentry = require('../../../utils/logger/sentry');
// eslint-disable-next-line no-unused-vars
const serverErrorHandler = (err, req, res, next) => {
  loggerSentry(err);
  res.status(500).json({
    status: 'Server Error',
    message: 'Our Engineer is working on it. Please try again later.',
  });
};
module.exports = serverErrorHandler;
