const Sentry = require('@sentry/node');
const { loggerConfig } = require('../../configs/logger');

const loggerSentry = (error) => {
  // any error in test environment will be ignored
  if (loggerConfig.env === 'test') return;
  Sentry.init({
    dsn: loggerConfig.dsn,
    environment: loggerConfig.env,
    sampleRate: loggerConfig.sampleRate,
  });
  Sentry.captureException(error);
};
module.exports = loggerSentry;
