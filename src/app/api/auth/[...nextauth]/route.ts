import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { randomBytes } from "crypto";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";

const providers = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const email = String(credentials.email).trim().toLowerCase();
      const defaultEmail = (process.env.DEFAULT_ADMIN_EMAIL || "ckakadiya1105@gmail.com").trim().toLowerCase();
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;

      // Bootstrap the requested account once, then authenticate from MongoDB.
      if (defaultPassword && email === defaultEmail) {
        let user = await db.getUserByEmail(defaultEmail);
        if (!user) {
          user = await db.createUser({
            id: randomBytes(12).toString("hex"),
            email: defaultEmail,
            password: await hashPassword(defaultPassword),
            name: "Admin",
            emailVerificationToken: "",
            emailVerificationExpires: Date.now(),
          });
        }
        if (user.password && await verifyPassword(String(credentials.password), user.password)) {
          return { id: user.id, email: user.email, name: user.name || "Admin", role: "admin" };
        }
      }

      // Preserve support for the existing hashed admin environment variables.
      const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
      if (email === adminEmail && adminPasswordHash && await verifyPassword(String(credentials.password), adminPasswordHash)) {
        return { id: "admin", email: adminEmail, name: "Admin", role: "admin" };
      }

      const user = await db.getUserByEmail(email);
      if (!user?.password) return null;
      if (!await verifyPassword(String(credentials.password), user.password)) return null;
      return { id: user.id, email: user.email, name: user.name || undefined, role: user.role, image: user.image || undefined };
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
      if (user && "role" in user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token.role) session.user = { ...session.user, role: token.role };
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
