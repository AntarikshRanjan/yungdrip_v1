import crypto from "node:crypto";
import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { HttpError } from "@/lib/http-error";
import { sendPasswordResetEmail } from "@/lib/email";
import PasswordResetToken from "@/models/PasswordResetToken";
import User from "@/models/User";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

function digestToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function sanitizeEmail(email) {
  if (typeof email !== "string") {
    throw new HttpError(400, "Email is required");
  }

  const normalized = email.trim().toLowerCase();

  if (!normalized || !normalized.includes("@")) {
    throw new HttpError(400, "Enter a valid email address");
  }

  return normalized;
}

export async function requestPasswordReset(email) {
  await connectToDatabase();

  const normalizedEmail = sanitizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail }).lean();

  if (!user) {
    return { ok: true };
  }

  await PasswordResetToken.deleteMany({ user: user._id });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

  await PasswordResetToken.create({
    user: user._id,
    tokenHash: digestToken(token),
    expiresAt
  });

  await sendPasswordResetEmail({ name: user.name, email: user.email }, token);

  return { ok: true };
}

export async function resetPasswordWithToken({ token, password }) {
  await connectToDatabase();

  if (typeof token !== "string" || token.length < 32) {
    throw new HttpError(400, "Invalid or expired reset link");
  }

  const resetRecord = await PasswordResetToken.findOne({
    tokenHash: digestToken(token),
    expiresAt: { $gt: new Date() }
  });

  if (!resetRecord) {
    throw new HttpError(400, "Invalid or expired reset link");
  }

  const user = await User.findById(resetRecord.user);

  if (!user) {
    throw new HttpError(400, "Invalid or expired reset link");
  }

  user.passwordHash = await hashPassword(password);
  await user.save();
  await PasswordResetToken.deleteMany({ user: user._id });

  return { ok: true };
}
