import { Cart, subtotalCents } from './cart';
import { validateCoupon, discountCents } from './coupon';
import { shippingCents } from './shipping';

export interface CheckoutSummary {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  couponApplied?: string;
  couponError?: string;
}

/**
 * Computes the order summary. Order of operations:
 *   1. subtotal
 *   2. coupon discount (if a valid code is given)
 *   3. shipping, based on what the customer pays for goods after discounts
 */
export function checkout(cart: Cart, couponCode?: string): CheckoutSummary {
  const subtotal = subtotalCents(cart);

  let discount = 0;
  let couponApplied: string | undefined;
  let couponError: string | undefined;

  if (couponCode) {
    const result = validateCoupon(couponCode, subtotal);
    if (result.ok) {
      discount = discountCents(result.coupon, subtotal);
      couponApplied = result.coupon.code;
    } else {
      couponError = result.reason;
    }
  }

  const payableGoods = subtotal - discount;
  const shipping = shippingCents(payableGoods);

  return {
    subtotalCents: subtotal,
    discountCents: discount,
    shippingCents: shipping,
    totalCents: payableGoods + shipping,
    couponApplied,
    couponError,
  };
}
