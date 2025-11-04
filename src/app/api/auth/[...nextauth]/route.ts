import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if this is the admin user (for backwards compatibility)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (credentials.email === adminEmail && adminPasswordHash) {
          const isValidPassword = await verifyPassword(
            credentials.password,
            adminPasswordHash
          );

          if (isValidPassword) {
            return {
              id: "admin",
              email: adminEmail,
              name: "Admin",
              role: "admin",
            };
          }
        }

        // Check database for regular users
        try {
          const user = await db.getUserByEmail(credentials.email);
          
          if (!user || !user.password) {
            return null;
          }

          // Check if email is verified
          if (user.emailVerified === 0) {
            throw new Error("Email not verified. Please check your email for verification link.");
          }

          const isValidPassword = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || undefined,
            role: user.role,
            image: user.image || undefined,
          };
        } catch (error) {
          console.error("Auth error:", error);
          if (error instanceof Error && error.message.includes("Email not verified")) {
            throw error;
          }
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
