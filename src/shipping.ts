/** Free shipping at or above this subtotal (after discounts), in cents. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 5_000;

export const STANDARD_SHIPPING_CENTS = 599;

/**
 * Shipping is decided on the amount the customer actually pays for goods
 * (subtotal minus discounts), not the raw subtotal.
 */
export function shippingCents(payableGoodsCents: number): number {
  return payableGoodsCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;
}
