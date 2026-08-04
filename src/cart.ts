export interface CartItem {
  sku: string;
  name: string;
  priceCents: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export function addItem(cart: Cart, item: CartItem): Cart {
  const existing = cart.items.find((i) => i.sku === item.sku);
  if (existing) {
    return {
      items: cart.items.map((i) =>
        i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    };
  }
  return { items: [...cart.items, item] };
}

export function removeItem(cart: Cart, sku: string): Cart {
  return { items: cart.items.filter((i) => i.sku !== sku) };
}

export function updateQuantity(cart: Cart, sku: string, quantity: number): Cart {
  if (quantity <= 0) return removeItem(cart, sku);
  return {
    items: cart.items.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
  };
}

/** Subtotal in integer cents — money math never touches floats. */
export function subtotalCents(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}
