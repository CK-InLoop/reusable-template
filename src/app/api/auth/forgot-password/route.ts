import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const message = "If an account exists for that email, a password reset link has been sent.";
  if (!normalizedEmail) return NextResponse.json({ message });

  const user = await db.getUserByEmail(normalizedEmail);
  if (!user) return NextResponse.json({ message });

  const rawToken = randomBytes(32).toString("hex");
  const token = createHash("sha256").update(rawToken).digest("hex");
  await db.updateUser(user.id, {
    passwordResetToken: token,
    passwordResetExpires: new Date(Date.now() + 30 * 60 * 1000),
  });
  await sendPasswordResetEmail(user.email, rawToken);
  return NextResponse.json({ message });
}
