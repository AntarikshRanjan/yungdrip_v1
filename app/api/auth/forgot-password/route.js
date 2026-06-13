import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { requestPasswordReset } from "@/lib/password-reset";
import { enforceRateLimit } from "@/lib/rate-limit";
import { assertTrustedOrigin, getClientIp } from "@/lib/security";

export async function POST(request) {
  try {
    assertTrustedOrigin(request);
    await enforceRateLimit({
      action: "auth:forgot-password:ip",
      identifier: getClientIp(request),
      windowMs: 15 * 60 * 1000,
      max: 8,
      blockMs: 30 * 60 * 1000
    });

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "unknown";

    await enforceRateLimit({
      action: "auth:forgot-password:email",
      identifier: email,
      windowMs: 60 * 60 * 1000,
      max: 3,
      blockMs: 60 * 60 * 1000
    });

    await requestPasswordReset(body.email);

    return NextResponse.json({
      ok: true,
      message: "If an account exists for that email, a reset link has been sent."
    });
  } catch (error) {
    return handleApiError(error);
  }
}
