import { createHash, randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { ensureDefaultAdmin, getDefaultAdminEmail } from '@/lib/default-admin';
import { db } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';

const SUCCESS_MESSAGE = 'If an account exists for that email, a password reset link has been sent.';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 });

    const user = email === getDefaultAdminEmail()
      ? await ensureDefaultAdmin()
      : await db.getUserByEmail(email);
    if (!user) return NextResponse.json({ message: SUCCESS_MESSAGE });

    const rawToken = randomBytes(32).toString('hex');
    const token = createHash('sha256').update(rawToken).digest('hex');
    await db.updateUser(user.id, {
      passwordResetToken: token,
      passwordResetExpires: new Date(Date.now() + 30 * 60 * 1000),
    });
    await sendPasswordResetEmail(user.email, rawToken);
    return NextResponse.json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Unable to send a reset email right now. Please try again.' }, { status: 500 });
  }
}
