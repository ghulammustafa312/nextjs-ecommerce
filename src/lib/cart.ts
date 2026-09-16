import type { CartItem } from "@/types/cart";

export const CART_STORAGE_KEY = "northline-cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "quantity">): CartItem[] {
  const items = readCart();
  const existing = items.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }

  writeCart(items);
  return items;
}

export function updateCartQuantity(id: number, quantity: number): CartItem[] {
  const items =
    quantity <= 0
      ? readCart().filter((item) => item.id !== id)
      : readCart().map((item) =>
          item.id === id ? { ...item, quantity } : item,
        );

  writeCart(items);
  return items;
}

export function removeFromCart(id: number): CartItem[] {
  return updateCartQuantity(id, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    typeof item.thumbnail === "string" &&
    typeof item.quantity === "number"
  );
}
