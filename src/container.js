/**
 * Dependency injection container.
 * Using hash-based object as storage.
 * we will inject this to the server.
 */
// External dependencies
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

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
const dbService = new DbServicePostgre(pool);

// passwordHash
const passwordHash = new PasswordHash(bcrypt);

/**
 * Create instance for each plugin dependencies.
 * Add them to the container.
 */
// Users plugin
const userRepository = new UserRepositoryPostgre(dbService);
const addUserUseCase = new AddUserUseCase(userRepository, passwordHash);
container.set(AddUserUseCase.name, addUserUseCase);

module.exports = { container };
