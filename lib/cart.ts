// lib/cart.ts
export type CartItem = { id: string; qty: number };

const KEY = "cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  // notify UI (same tab)
  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
}

export function addToCart(id: string, qty = 1) {
  const items = getCart();
  const existing = items.find((x) => x.id === id);

  let updated: CartItem[];
  if (existing) {
    updated = items.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x));
  } else {
    updated = [...items, { id, qty: Math.max(1, qty) }];
  }

  setCart(updated);
}

export function updateQty(id: string, qty: number) {
  const items = getCart();
  const safeQty = Math.max(1, qty);
  const updated = items.map((x) => (x.id === id ? { ...x, qty: safeQty } : x));
  setCart(updated);
}

export function removeFromCart(id: string) {
  const items = getCart().filter((x) => x.id !== id);
  setCart(items);
}

export function clearCart() {
  setCart([]);
}
