import { useState } from 'react';
import { validateCoupon, type Coupon } from '../src/coupon';
import { formatUsd } from './format';

const REASON_MESSAGES = {
  unknown: 'We don’t recognize that code.',
  expired: 'That code has expired.',
  below_minimum: 'Your cart doesn’t reach this code’s minimum yet.',
} as const;

/**
 * Coupon input: validates on apply (not on every keystroke), surfaces the
 * specific rejection reason, and hands the accepted coupon up to the cart.
 */
export function CouponField({
  subtotalCents,
  onApply,
}: {
  subtotalCents: number;
  onApply: (coupon: Coupon) => void;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);

  function apply() {
    const result = validateCoupon(code, subtotalCents);
    if (!result.ok) {
      setError(REASON_MESSAGES[result.reason]);
      return;
    }
    setError(null);
    setApplied(result.coupon.code);
    onApply(result.coupon);
  }

  if (applied) {
    return (
      <p className="coupon-applied" role="status">
        Code <strong>{applied}</strong> applied.
      </p>
    );
  }

  return (
    <div className="coupon-field">
      <label htmlFor="coupon-code">Promo code</label>
      <input
        id="coupon-code"
        value={code}
        onChange={(e) => { setCode(e.target.value); setError(null); }}
        placeholder="SAVE10"
        autoCapitalize="characters"
        autoCorrect="off"
      />
      <button type="button" onClick={apply} disabled={code.trim().length === 0}>
        Apply
      </button>
      {error && <p className="coupon-error" role="alert">{error}</p>}
    </div>
  );
}

export function formatMinimum(cents: number): string {
  return `Minimum ${formatUsd(cents)}`;
}
