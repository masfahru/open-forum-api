/* istanbul ignore file */
require('dotenv').config();
const Joi = require('joi');

// Joi Schema for logger configuration
const schema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  SENTRY_DSN: [Joi.string(), Joi.allow(''), Joi.allow(null)],
  SAMPLE_RATE: Joi.number().min(0).max(1).default(1),
}).unknown();

// Validate the configuration
const { value, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// create logger configuration object
const loggerConfig = {
  env: value.NODE_ENV,
  dsn: value.SENTRY_DSN,
  sampleRate: value.SAMPLE_RATE,
};

// export the configuration
module.exports = { loggerConfig };
