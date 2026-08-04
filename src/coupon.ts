export interface Coupon {
  code: string;
  /** Percentage discount, 1–100. */
  percentOff: number;
  /** Minimum subtotal (cents) for the coupon to apply. */
  minSubtotalCents: number;
  expiresAt: Date;
}

const COUPONS: Coupon[] = [
  { code: 'SAVE10', percentOff: 10, minSubtotalCents: 0, expiresAt: new Date('2027-01-01') },
  { code: 'BIGCART20', percentOff: 20, minSubtotalCents: 10_000, expiresAt: new Date('2027-01-01') },
];

export type CouponResult =
  | { ok: true; coupon: Coupon }
  | { ok: false; reason: 'unknown' | 'expired' | 'below_minimum' };

export function validateCoupon(code: string, subtotalCents: number, now = new Date()): CouponResult {
  const coupon = COUPONS.find((c) => c.code === code.trim().toUpperCase());
  if (!coupon) return { ok: false, reason: 'unknown' };
  if (coupon.expiresAt < now) return { ok: false, reason: 'expired' };
  if (subtotalCents < coupon.minSubtotalCents) return { ok: false, reason: 'below_minimum' };
  return { ok: true, coupon };
}

/** Discount in cents, rounded half-up to the cent. */
export function discountCents(coupon: Coupon, subtotalCents: number): number {
  return Math.round((subtotalCents * coupon.percentOff) / 100);
}
