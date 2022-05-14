require('dotenv').config();
const Joi = require('joi');

// Joi Schema for server configuration
const schema = Joi.object().keys({
  PGHOST: Joi.string().hostname().required(),
  PGPORT: Joi.number().port().required(),
  PGUSER: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  PGHOST_TEST: Joi.string().hostname().required(),
  PGPORT_TEST: Joi.number().port().required(),
  PGUSER_TEST: Joi.string().required(),
  PGPASSWORD_TEST: Joi.string().required(),
  PGDATABASE_TEST: Joi.string().required(),
}).unknown();

// Validate the configuration
const { value, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// create server configuration object
const dbConfig = {
  host: value.PGHOST,
  port: value.PGPORT,
  user: value.PGUSER,
  password: value.PGPASSWORD,
  database: value.PGDATABASE,
};

// create test configuration object
const testDbConfig = {
  host: value.PGHOST_TEST,
  port: value.PGPORT_TEST,
  user: value.PGUSER_TEST,
  password: value.PGPASSWORD_TEST,
  database: value.PGDATABASE_TEST,
};

// export the configuration
module.exports = { dbConfig, testDbConfig };
