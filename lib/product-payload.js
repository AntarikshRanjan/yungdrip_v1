import { HttpError } from "@/lib/http-error";

function sanitizeString(value, field, { min = 1, max = 300 } = {}) {
  if (typeof value !== "string") {
    throw new HttpError(400, `${field} must be a string`);
  }

  const trimmed = value.trim();

  if (trimmed.length < min) {
    throw new HttpError(400, `${field} must be at least ${min} characters`);
  }

  if (trimmed.length > max) {
    throw new HttpError(400, `${field} must be at most ${max} characters`);
  }

  return trimmed;
}

function sanitizeStringArray(value, field) {
  if (!Array.isArray(value)) {
    throw new HttpError(400, `${field} must be an array`);
  }

  const sanitized = [...new Set(value.map((item) => sanitizeString(item, field, { min: 1, max: 120 })))];

  if (sanitized.length === 0) {
    throw new HttpError(400, `${field} must contain at least one item`);
  }

  return sanitized;
}

function sanitizeTags(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new HttpError(400, "tags must be an object");
  }

  return {
    bodyType: value.bodyType ? sanitizeStringArray(value.bodyType, "tags.bodyType") : [],
    skinTone: value.skinTone ? sanitizeStringArray(value.skinTone, "tags.skinTone") : [],
    style: value.style ? sanitizeStringArray(value.style, "tags.style") : []
  };
}

export function sanitizeProductPayload(payload, { partial = false } = {}) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new HttpError(400, "Invalid product payload");
  }

  const sanitized = {};

  if (!partial || payload.name !== undefined) {
    sanitized.name = sanitizeString(payload.name, "name", { min: 2, max: 120 });
  }

  if (!partial || payload.price !== undefined) {
    const parsedPrice = Number(payload.price);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      throw new HttpError(400, "price must be a positive number");
    }

    sanitized.price = parsedPrice;
  }

  if (!partial || payload.description !== undefined) {
    sanitized.description = sanitizeString(payload.description, "description", {
      min: 10,
      max: 2000
    });
  }

  if (!partial || payload.category !== undefined) {
    sanitized.category = sanitizeString(payload.category, "category", { min: 2, max: 60 });
  }

  if (!partial || payload.images !== undefined) {
    sanitized.images = sanitizeStringArray(payload.images, "images");
  }

  if (!partial || payload.sizes !== undefined) {
    sanitized.sizes = sanitizeStringArray(payload.sizes, "sizes");
  }

  if (!partial || payload.colors !== undefined) {
    sanitized.colors = sanitizeStringArray(payload.colors, "colors");
  }

  if (!partial || payload.featured !== undefined) {
    sanitized.featured = Boolean(payload.featured);
  }

  if (!partial || payload.tags !== undefined) {
    sanitized.tags = payload.tags ? sanitizeTags(payload.tags) : { bodyType: [], skinTone: [], style: [] };
  }

  if (!partial || payload.inventory !== undefined) {
    sanitized.inventory = sanitizeInventory(payload.inventory);
  }

  return sanitized;
}

function sanitizeInventory(value) {
  if (value === undefined || value === null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new HttpError(400, "inventory must be an array");
  }

  return value.map((entry, index) => {
    if (!entry || typeof entry !== "object") {
      throw new HttpError(400, `inventory[${index}] must be an object`);
    }

    const quantity = Number(entry.quantity);

    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new HttpError(400, `inventory[${index}].quantity must be a non-negative integer`);
    }

    return {
      size: sanitizeString(entry.size, `inventory[${index}].size`, { min: 1, max: 40 }),
      color: sanitizeString(entry.color, `inventory[${index}].color`, { min: 1, max: 60 }),
      quantity
    };
  });
}
