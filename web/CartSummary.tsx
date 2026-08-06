import { useState } from 'react';
import { updateQuantity, type Cart } from '../src/cart';
import { checkout } from '../src/checkout';
import { type Coupon } from '../src/coupon';
import { CouponField } from './CouponField';
import { formatUsd } from './format';

/**
 * Cart panel: line items with quantity steppers, the coupon field, and the
 * order totals — all derived from the same `checkout()` the backend uses, so
 * what the customer sees is exactly what they'll be charged.
 */
export function CartSummary({ initialCart }: { initialCart: Cart }) {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const summary = checkout(cart, coupon?.code);

  if (cart.items.length === 0) {
    return <p className="cart-empty">Your cart is empty.</p>;
  }

  return (
    <section className="cart-summary" aria-label="Cart">
      <ul className="cart-items">
        {cart.items.map((item) => (
          <li key={item.sku} className="cart-item">
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-qty">
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.name}`}
                onClick={() => setCart(updateQuantity(cart, item.sku, item.quantity - 1))}
              >
                −
              </button>
              <span aria-live="polite">{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() => setCart(updateQuantity(cart, item.sku, item.quantity + 1))}
              >
                +
              </button>
            </span>
            <span className="cart-item-price">{formatUsd(item.priceCents * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <CouponField subtotalCents={summary.subtotalCents} onApply={setCoupon} />

      <dl className="cart-totals">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatUsd(summary.subtotalCents)}</dd>
        </div>
        {summary.discountCents > 0 && (
          <div>
            <dt>Discount</dt>
            <dd>−{formatUsd(summary.discountCents)}</dd>
          </div>
        )}
        <div>
          <dt>Shipping</dt>
          <dd>{summary.shippingCents === 0 ? 'Free' : formatUsd(summary.shippingCents)}</dd>
        </div>
        <div className="cart-total">
          <dt>Total</dt>
          <dd>{formatUsd(summary.totalCents)}</dd>
        </div>
      </dl>

      <button type="button" className="checkout-button">
        Checkout — {formatUsd(summary.totalCents)}
      </button>
    </section>
  );
}
