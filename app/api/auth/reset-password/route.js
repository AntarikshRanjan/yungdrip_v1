import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { resetPasswordWithToken } from "@/lib/password-reset";
import { enforceRateLimit } from "@/lib/rate-limit";
import { assertTrustedOrigin, getClientIp } from "@/lib/security";

export async function POST(request) {
  try {
    assertTrustedOrigin(request);
    await enforceRateLimit({
      action: "auth:reset-password:ip",
      identifier: getClientIp(request),
      windowMs: 15 * 60 * 1000,
      max: 10,
      blockMs: 30 * 60 * 1000
    });

    const body = await request.json();
    await resetPasswordWithToken(body);

    return NextResponse.json({
      ok: true,
      message: "Password updated. You can sign in with your new password."
    });
  } catch (error) {
    return handleApiError(error);
  }
}
