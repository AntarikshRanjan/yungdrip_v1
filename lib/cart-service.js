import { connectToDatabase } from "@/lib/db";
import { HttpError } from "@/lib/http-error";
import Cart from "@/models/Cart";

function sanitizeCartItem(item) {
  if (!item || typeof item !== "object") {
    throw new HttpError(400, "Invalid cart item");
  }

  const quantity = Number(item.quantity);

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    throw new HttpError(400, "Invalid item quantity");
  }

  return {
    cartKey: String(item.cartKey || ""),
    productId: String(item.productId || ""),
    name: String(item.name || ""),
    price: Number(item.price),
    image: String(item.image || ""),
    size: String(item.size || ""),
    color: String(item.color || ""),
    quantity
  };
}

function isValidCartItem(item) {
  return Boolean(
    item.cartKey &&
      item.productId &&
      item.name &&
      Number.isFinite(item.price) &&
      item.image &&
      item.size &&
      item.color &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
}

function normalizeCart(document) {
  if (!document) {
    return { items: [] };
  }

  const raw = typeof document.toObject === "function" ? document.toObject() : document;

  return {
    _id: raw._id?.toString?.() || raw._id,
    user: raw.user?.toString?.() || raw.user,
    items: Array.isArray(raw.items) ? raw.items.filter(isValidCartItem) : [],
    updatedAt: raw.updatedAt
  };
}

function mergeCartItems(serverItems, localItems) {
  const merged = new Map();

  for (const item of serverItems) {
    if (isValidCartItem(item)) {
      merged.set(item.cartKey, { ...item });
    }
  }

  for (const item of localItems) {
    if (!isValidCartItem(item)) {
      continue;
    }

    const existing = merged.get(item.cartKey);

    if (existing) {
      merged.set(item.cartKey, {
        ...existing,
        quantity: Math.min(10, existing.quantity + item.quantity)
      });
    } else {
      merged.set(item.cartKey, { ...item });
    }
  }

  return [...merged.values()];
}

export async function getCartForUser(userId) {
  await connectToDatabase();

  const cart = await Cart.findOne({ user: userId }).lean();
  return normalizeCart(cart);
}

export async function saveCartForUser(userId, items) {
  await connectToDatabase();

  const sanitizedItems = Array.isArray(items)
    ? items.map(sanitizeCartItem).filter(isValidCartItem)
    : [];

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: sanitizedItems },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return normalizeCart(cart);
}

export async function mergeCartForUser(userId, localItems) {
  await connectToDatabase();

  const existing = await Cart.findOne({ user: userId }).lean();
  const serverItems = existing?.items || [];
  const sanitizedLocal = Array.isArray(localItems)
    ? localItems.map(sanitizeCartItem).filter(isValidCartItem)
    : [];
  const mergedItems = mergeCartItems(serverItems, sanitizedLocal);

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: mergedItems },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return normalizeCart(cart);
}
