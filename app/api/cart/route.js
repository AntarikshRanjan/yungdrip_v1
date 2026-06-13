import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth";
import { getCartForUser, mergeCartForUser, saveCartForUser } from "@/lib/cart-service";
import { assertTrustedOrigin } from "@/lib/security";

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const cart = await getCartForUser(user._id);

    return NextResponse.json({ cart });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request) {
  try {
    assertTrustedOrigin(request);
    const user = await requireCurrentUser();
    const body = await request.json();
    const cart = await saveCartForUser(user._id, body.items);

    return NextResponse.json({ cart });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    assertTrustedOrigin(request);
    const user = await requireCurrentUser();
    const body = await request.json();
    const cart = await mergeCartForUser(user._id, body.items);

    return NextResponse.json({ cart });
  } catch (error) {
    return handleApiError(error);
  }
}
