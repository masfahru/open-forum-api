const { Pool } = require('pg');
const DatabaseError = require('../../../../utils/errors/databaseError');
const DbServicePostgre = require('../dbServicePostgre');
const { testDbConfig } = require('../../../../configs/database');

describe('Database Service Postgre Test', () => {
  it('should return Database Error when the database connection is failed', async () => {
    // create random config
    const dbConfig = {
      host: 'localhost',
      port: 5432,
      user: 'randomUser',
      password: 'postgres',
      database: 'postgres',
    };
    const pool = new Pool(dbConfig);
    const dbServicePostgre = new DbServicePostgre(pool);
    expect(dbServicePostgre).toBeInstanceOf(DbServicePostgre);
    await expect(dbServicePostgre.query({ text: 'SELECT NOW()' })).rejects.toThrow(DatabaseError);
  });

  it('should return object with required key when query is success', async () => {
    const pool = new Pool(testDbConfig);
    const dbServicePostgre = new DbServicePostgre(pool);
    expect(dbServicePostgre).toBeInstanceOf(DbServicePostgre);
    await expect(dbServicePostgre.query({ text: 'SELECT NOW()' })).resolves.toEqual(expect.objectContaining({
      rowCount: expect.any(Number),
      rows: expect.any(Array),
    }));
    // should end the connection
    await dbServicePostgre.end();
  });
});
