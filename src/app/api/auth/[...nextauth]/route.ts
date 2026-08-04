import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { ensureDefaultAdmin, getDefaultAdminEmail } from '@/lib/default-admin';
import { applyProductionAuthUrl } from '@/lib/app-url';

applyProductionAuthUrl();

const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const email = String(credentials.email).trim().toLowerCase();
      const password = String(credentials.password);

      try {
        const user = email === getDefaultAdminEmail()
          ? await ensureDefaultAdmin()
          : await db.getUserByEmail(email);
        if (user?.password && await verifyPassword(password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name || undefined,
            role: user.role,
            image: user.image || undefined,
          };
        }

        const legacyEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
        const legacyHash = process.env.ADMIN_PASSWORD_HASH;
        if (email === legacyEmail && legacyHash && await verifyPassword(password, legacyHash)) {
          return { id: 'admin', email: legacyEmail, name: 'Admin', role: 'admin' };
        }
        return null;
      } catch (error) {
        console.error('Credential authorization failed:', error);
        return null;
      }
    },
  }),
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })]
    : []),
];

const handler = NextAuth({
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token.role) session.user = { ...session.user, role: token.role };
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
