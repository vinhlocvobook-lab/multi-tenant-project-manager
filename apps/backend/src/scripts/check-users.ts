import { MikroORM } from '@mikro-orm/mariadb';
import config from '../mikro-orm.config';
import { User } from '../app/users/entities/user.entity';

async function checkUsers() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  const users = await em.find(User, {}, { populate: ['role'] });
  console.log('--- Current Users in DB ---');
  if (users.length === 0) {
    console.log('No users found in database!');
  } else {
    for (const u of users) {
      console.log(`- Email: ${u.email}, Role: ${u.role?.name || 'NULL'}, PasswordHash: ${u.password.substring(0, 20)}...`);
    }
  }

  await orm.close();
}

checkUsers().catch(console.error);
