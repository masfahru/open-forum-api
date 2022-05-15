require('dotenv').config();
const Joi = require('joi');

// Joi Schema for server configuration
const schema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  PORT: Joi.number().min(0).max(65535).default(5000),
  HOST: Joi.string().hostname().default('localhost'),
}).unknown();

// Validate the configuration
const { value, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// create server configuration object
const serverConfig = {
  env: value.NODE_ENV,
  port: value.PORT,
  host: value.HOST,
};

// export the configuration
module.exports = { serverConfig };
