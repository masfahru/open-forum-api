/* istanbul ignore file */
/**
 * Dependency injection container.
 * Using hash-based object as storage.
 * we will inject this to the server.
 */
// External dependencies
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const Sentry = require('@sentry/node');

/**
 *  Configs
 */
const { serverConfig } = require('./configs/server');
const { dbConfig, testDbConfig } = require('./configs/database');
const { loggerConfig } = require('./configs/logger');

/**
 * Utilities
 */
// passwordHash
const PasswordHash = require('./utils/security/bcryptPasswordHash');

/**
 *  Services
 */
// Database
const DbServicePostgre = require('./services/databases/postgres/dbServicePostgre');

/**
 * Repositories
 */
// User
const UserRepositoryPostgre = require('./api/users/repositories/userRepositoryPostgre');

/**
 * Use cases
 */
// User
const AddUserUseCase = require('./api/users/use_cases/addUserUseCase');

/**
 * Create dependency injection container.
 */
const container = new Map();

/**
 * Create an instance for each dependency.
 * Start from external dependencies.
 */
// database node-postgres
const databaseConfig = (serverConfig.env === 'test') ? testDbConfig : dbConfig;
const pool = new Pool(databaseConfig);
container.set(Pool.name, pool);
const dbService = new DbServicePostgre(pool);
container.set(DbServicePostgre.name, dbService);
// passwordHash
const passwordHash = new PasswordHash(bcrypt);
container.set(PasswordHash.name, passwordHash);
// nanoid
container.set('nanoid', nanoid);
// sentry
// don't add sentry in test env
if (serverConfig.env !== 'test') {
  const tracesSampleRate = (serverConfig.env === 'development') ? 1 : 0.2;
  const sentry = Sentry.init({
    dsn: loggerConfig.dsn,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate,
  });
  // only add sentry if dsn is set
  if (loggerConfig.dsn.length > 0) container.set('sentry', sentry);
}

/**
 * Create instance for each plugin dependencies.
 * Add them to the container.
 */
// Users plugin
const userRepository = new UserRepositoryPostgre(container.get(DbServicePostgre.name), container.get('nanoid'));
container.set(UserRepositoryPostgre.name, userRepository);

// eslint-disable-next-line max-len
const addUserUseCase = new AddUserUseCase(container.get(UserRepositoryPostgre.name), container.get(PasswordHash.name));
container.set(AddUserUseCase.name, addUserUseCase);

module.exports = { container };
