export function getVariantKey(size, color) {
  return `${size}::${color}`;
}

export function getStockForVariant(product, size, color) {
  if (!Array.isArray(product?.inventory) || product.inventory.length === 0) {
    return null;
  }

  const entry = product.inventory.find((item) => item.size === size && item.color === color);
  return entry ? Number(entry.quantity) : 0;
}

export function isVariantInStock(product, size, color, requestedQuantity = 1) {
  const stock = getStockForVariant(product, size, color);

  if (stock === null) {
    return true;
  }

  return stock >= requestedQuantity;
}

export function getTotalStock(product) {
  if (!Array.isArray(product?.inventory) || product.inventory.length === 0) {
    return null;
  }

  return product.inventory.reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export function buildInventoryFromProduct(product, defaultQuantity = 25) {
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const inventory = [];

  for (const size of sizes) {
    for (const color of colors) {
      inventory.push({ size, color, quantity: defaultQuantity });
    }
  }

  return inventory;
}
