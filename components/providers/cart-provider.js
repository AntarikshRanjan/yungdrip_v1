"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Toast from "@/components/toast";
import { useAuth } from "@/components/providers/auth-provider";
import { mergeServerCart, saveServerCart } from "@/lib/api-client";

const CartContext = createContext(null);
const STORAGE_KEY = "yungdrip-cart";

function isValidCartItem(item) {
  return Boolean(
    item &&
      typeof item.cartKey === "string" &&
      typeof item.productId === "string" &&
      typeof item.name === "string" &&
      Number.isFinite(item.price) &&
      typeof item.image === "string" &&
      typeof item.size === "string" &&
      typeof item.color === "string" &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
}

function isValidProductForCart(product, selection) {
  return Boolean(
    product &&
      typeof product._id === "string" &&
      typeof product.name === "string" &&
      Number.isFinite(product.price) &&
      Array.isArray(product.images) &&
      typeof product.images[0] === "string" &&
      Array.isArray(product.sizes) &&
      product.sizes.includes(selection.size) &&
      Array.isArray(product.colors) &&
      product.colors.includes(selection.color)
  );
}

export function CartProvider({ children }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState(null);
  const hasMergedRef = useRef(false);
  const skipNextSyncRef = useRef(false);
  const localItemsRef = useRef([]);

  useEffect(() => {
    localItemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);

    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        setItems(Array.isArray(parsedItems) ? parsedItems.filter(isValidCartItem) : []);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (isAuthLoading || !isHydrated) {
      return;
    }

    if (!user) {
      hasMergedRef.current = false;
      return;
    }

    if (hasMergedRef.current) {
      return;
    }

    let cancelled = false;

    async function mergeCartOnLogin() {
      try {
        const payload = await mergeServerCart({ items: localItemsRef.current });
        const mergedItems = payload.cart?.items || [];

        if (!cancelled) {
          skipNextSyncRef.current = true;
          setItems(mergedItems.filter(isValidCartItem));
          hasMergedRef.current = true;
        }
      } catch {
        if (!cancelled) {
          hasMergedRef.current = true;
        }
      }
    }

    mergeCartOnLogin();

    return () => {
      cancelled = true;
    };
  }, [user, isAuthLoading, isHydrated]);

  useEffect(() => {
    if (!user || !isHydrated || !hasMergedRef.current) {
      return;
    }

    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      saveServerCart({ items }).catch(() => {});
    }, 400);

    return () => window.clearTimeout(timer);
  }, [items, user, isHydrated]);

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  const addItem = useCallback((product, selection) => {
    if (!isValidProductForCart(product, selection)) {
      showToast("This product is unavailable for cart.");
      return false;
    }

    const cartItem = {
      cartKey: `${product._id}-${selection.size}-${selection.color}`,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selection.size,
      color: selection.color,
      quantity: 1
    };

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.cartKey === cartItem.cartKey);

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartKey === cartItem.cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, cartItem];
    });

    showToast(`${product.name} added to cart`);
    return true;
  }, [showToast]);

  const removeItem = useCallback(
    (cartKey) => {
      setItems((currentItems) => currentItems.filter((item) => item.cartKey !== cartKey));
      showToast("Item removed from cart");
    },
    [showToast]
  );

  const updateQuantity = useCallback((cartKey, nextQuantity) => {
    if (nextQuantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.cartKey !== cartKey));
      showToast("Item removed from cart");
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: nextQuantity } : item
      )
    );
  }, [showToast]);

  const clearCart = useCallback(() => {
    setItems([]);
    showToast("Cart cleared");
  }, [showToast]);

  const value = useMemo(
    () => ({
      items,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      cartCount: items.reduce((total, item) => total + item.quantity, 0),
      cartTotal: items.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    [addItem, clearCart, isHydrated, items, removeItem, updateQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast message={toast} onClose={() => setToast(null)} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
