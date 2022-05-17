const { Pool } = require('pg');
const { container } = require('../../../../container');
const DatabaseError = require('../../../../utils/errors/databaseError');
const DbServicePostgre = require('../dbServicePostgre');

describe('Database Service Postgre Test', () => {
  afterAll(async () => {
    await container.get(Pool.name).end();
  });

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
    await pool.end();
  });

  it('should throw Database Error when required key is missing', async () => {
    const pool = container.get(Pool.name);
    const dbServicePostgre = new DbServicePostgre(pool);
    const mockPayload = {
      text: 'SELECT NOW()',
    };
    await expect(dbServicePostgre.query(mockPayload)).rejects.toThrow(DatabaseError);
  });

  it('should return object with required key when query is success', async () => {
    const pool = container.get(Pool.name);
    const dbServicePostgre = new DbServicePostgre(pool);
    await expect(dbServicePostgre.query({ text: 'SELECT NOW()', values: [] })).resolves.toEqual(expect.objectContaining({
      rowCount: expect.any(Number),
      rows: expect.any(Array),
    }));
  });

  it('should drain all connections when end is called', async () => {
    const pool = container.get(Pool.name);
    const dbServicePostgre = new DbServicePostgre(pool);
    await dbServicePostgre.end();
    await expect(pool.totalCount).toBe(0);

    // recreate pool
    container.set(Pool.name, new Pool(container.get(Pool.name).config));
  });
});
