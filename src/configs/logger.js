/* istanbul ignore file */
require('dotenv').config();
const Joi = require('joi');

// Joi Schema for server configuration
const schema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  SENTRY_DSN: Joi.string().default(''),
}).unknown();

// Validate the configuration
const { value, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// create server configuration object
const loggerConfig = {
  env: value.NODE_ENV,
  dsn: value.SENTRY_DSN,
};

// export the configuration
module.exports = { loggerConfig };
