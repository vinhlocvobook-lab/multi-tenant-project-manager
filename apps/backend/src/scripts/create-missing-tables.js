const mariadb = require('mariadb');
require('dotenv').config({ path: __dirname + '/../.env' }); // or we can just hardcode if it resolves path

async function run() {
  const pool = mariadb.createPool({
    host: 'localhost',
    user: 'project_manager',
    password: 'project_manager_pass',
    database: 'project_manager',
    connectionLimit: 1
  });

  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connected to MariaDB successfully.');

    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`projects_departments\` (
        \`project_id\` varchar(36) NOT NULL,
        \`department_id\` varchar(36) NOT NULL,
        PRIMARY KEY (\`project_id\`, \`department_id\`),
        CONSTRAINT \`fk_projects_departments_project_id\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`fk_projects_departments_department_id\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    
    // Also ensuring projects_leaders exists just in case
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`projects_leaders\` (
        \`project_id\` varchar(36) NOT NULL,
        \`user_id\` varchar(36) NOT NULL,
        PRIMARY KEY (\`project_id\`, \`user_id\`),
        CONSTRAINT \`fk_projects_leaders_project_id\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`fk_projects_leaders_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('Successfully created missing pivot tables.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    if (conn) conn.end();
    pool.end();
  }
}

run();
