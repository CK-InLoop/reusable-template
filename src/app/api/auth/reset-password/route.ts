import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();
  if (!token || typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "A valid token and password of at least 8 characters are required." }, { status: 400 });
  }
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const user = await db.getUserByPasswordResetToken(hashedToken);
  if (!user) return NextResponse.json({ error: "This reset link is invalid or expired." }, { status: 400 });

  await db.updateUser(user.id, {
    password: await hashPassword(password),
    passwordResetToken: null,
    passwordResetExpires: null,
  });
  return NextResponse.json({ message: "Password updated successfully." });
}
