import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-response";
import { requireAdminUser } from "@/lib/auth";
import { deleteProduct, getProductById, updateProduct } from "@/lib/product-service";
import { assertTrustedOrigin } from "@/lib/security";

export async function GET(_request, { params }) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    assertTrustedOrigin(request);
    await requireAdminUser();
    const body = await request.json();
    const product = await updateProduct(params.id, body);
    return NextResponse.json(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    assertTrustedOrigin(_request);
    await requireAdminUser();
    const product = await deleteProduct(params.id);
    return NextResponse.json({
      message: "Product deleted successfully",
      product
    });
  } catch (error) {
    return handleApiError(error);
  }
}
