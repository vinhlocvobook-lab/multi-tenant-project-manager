const mariadb = require('mariadb');
require('dotenv').config();

async function cleanup() {
  const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306')
  });

  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connected to MariaDB. Dropping tables...');
    
    // Drop in order to avoid FK issues
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('DROP TABLE IF EXISTS roles_permissions');
    await conn.query('DROP TABLE IF EXISTS roles');
    await conn.query('DROP TABLE IF EXISTS permissions');
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('Tables dropped successfully.');
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    if (conn) conn.end();
    pool.end();
  }
}

cleanup();
