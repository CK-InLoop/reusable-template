const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.DEFAULT_ADMIN_EMAIL || 'ckakadiya1105@gmail.com').trim().toLowerCase();
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  if (!password) throw new Error('DEFAULT_ADMIN_PASSWORD is required');

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash, name: 'Admin', role: 'admin', emailVerified: true },
    create: { email, password: passwordHash, name: 'Admin', role: 'admin', emailVerified: true },
  });
  console.log(`Admin account is ready for ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
