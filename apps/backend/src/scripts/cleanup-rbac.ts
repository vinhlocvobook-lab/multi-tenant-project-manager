import { MikroORM } from '@mikro-orm/mariadb';
import config from '../mikro-orm.config';

async function cleanup() {
  const orm = await MikroORM.init(config);
  const knex = orm.em.getKnex();
  
  console.log('Cleaning up RBAC tables...');
  try {
    await knex.schema.dropTableIfExists('roles_permissions');
    await knex.schema.dropTableIfExists('roles');
    await knex.schema.dropTableIfExists('permissions');
    console.log('Done.');
  } catch (e) {
    console.error(e);
  } finally {
    await orm.close();
  }
}

cleanup();
