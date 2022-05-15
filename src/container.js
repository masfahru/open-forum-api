/**
 * Dependency injection container.
 * Using hash-based object as storage.
 * we will inject this to the server.
 */
// External dependencies
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { nanoid } = require('nanoid');

/**
 *  Configs
 */
const { serverConfig } = require('./configs/server');
const { dbConfig, testDbConfig } = require('./configs/database');

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
