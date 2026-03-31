const mariadb = require('mariadb');
require('dotenv').config();

async function check() {
  const pool = mariadb.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306')
  });

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT u.id, u.email, u.full_name, u.role_id, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id');
    console.log('--- Database Users ---');
    console.table(rows);
    
    const rbac = await conn.query('SELECT r.name, COUNT(rp.permission_id) as perms FROM roles r LEFT JOIN roles_permissions rp ON r.id = rp.role_id GROUP BY r.id');
    console.log('--- Roles & Permissions Count ---');
    console.table(rbac);
  } catch (err) {
    console.error('Error connecting or querying:', err.message);
  } finally {
    if (conn) conn.end();
    pool.end();
  }
}

check();
