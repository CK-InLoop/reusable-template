import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';

const FALLBACK_ADMIN_EMAIL = 'ckakadiya1105@gmail.com';

export function getDefaultAdminEmail() {
  return (process.env.DEFAULT_ADMIN_EMAIL || FALLBACK_ADMIN_EMAIL).trim().toLowerCase();
}

export async function ensureDefaultAdmin() {
  const email = getDefaultAdminEmail();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.role !== 'admin' || !existing.emailVerified) {
      return prisma.user.update({
        where: { id: existing.id },
        data: { role: 'admin', emailVerified: true },
      });
    }
    return existing;
  }

  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  if (!password) return null;

  return prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
      name: 'Admin',
      role: 'admin',
      emailVerified: true,
    },
  });
}
