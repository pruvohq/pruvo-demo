import { FREE_SHIPPING_THRESHOLD_CENTS } from '../src/shipping';
import { formatUsd } from './format';

/**
 * Nudges the customer toward free shipping with a progress bar.
 *
 * The progress is computed on the amount the customer actually pays for
 * goods (subtotal minus discount) — the same rule the backend uses to decide
 * shipping — so applying a coupon can move the customer BACK below the
 * threshold, and the nudge must reappear when that happens.
 */
export function FreeShippingNudge({ payableGoodsCents }: { payableGoodsCents: number }) {
  if (payableGoodsCents <= 0) return null;

  const remaining = FREE_SHIPPING_THRESHOLD_CENTS - payableGoodsCents;

  if (remaining <= 0) {
    return (
      <p className="shipping-nudge shipping-nudge-done" role="status">
        🎉 Your order ships free.
      </p>
    );
  }

  const percent = Math.min(
    100,
    Math.round((payableGoodsCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100),
  );

  return (
    <div className="shipping-nudge" role="status">
      <p>
        Add <strong>{formatUsd(remaining)}</strong> more for free shipping.
      </p>
      <div
        className="shipping-nudge-bar"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress toward free shipping"
      >
        <div className="shipping-nudge-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
