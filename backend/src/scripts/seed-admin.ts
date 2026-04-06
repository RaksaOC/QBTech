import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { admins } from '../db/schema.js';

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const hash = await bcrypt.hash(password, 10);

  const [existing] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (existing) {
    console.log('Admin already exists:', email);
    return;
  }
  await db.insert(admins).values({ email, passwordHash: hash });
  console.log('Seeded admin:', email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
