import { Cart, subtotalCents } from './cart';
import { validateCoupon, discountCents } from './coupon';
import { shippingCents } from './shipping';
import { lookupGiftCard, redeemableCents } from './giftcard';

export interface CheckoutSummary {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  giftCardCents: number;
  totalCents: number;
  couponApplied?: string;
  couponError?: string;
  giftCardApplied?: string;
  giftCardError?: string;
}

/**
 * Computes the order summary. Order of operations:
 *   1. subtotal
 *   2. coupon discount (if a valid code is given)
 *   3. shipping, based on what the customer pays for goods after discounts
 */
export function checkout(cart: Cart, couponCode?: string, giftCardCode?: string): CheckoutSummary {
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

  // Gift cards are a payment method, not a discount: they apply to the final
  // amount (goods + shipping) and never affect the free-shipping threshold.
  let giftCard = 0;
  let giftCardApplied: string | undefined;
  let giftCardError: string | undefined;
  if (giftCardCode) {
    const card = lookupGiftCard(giftCardCode);
    if (card) {
      giftCard = redeemableCents(card, payableGoods + shipping);
      giftCardApplied = card.code;
    } else {
      giftCardError = 'unknown_card';
    }
  }

  return {
    subtotalCents: subtotal,
    discountCents: discount,
    shippingCents: shipping,
    giftCardCents: giftCard,
    totalCents: payableGoods + shipping - giftCard,
    couponApplied,
    couponError,
    giftCardApplied,
    giftCardError,
  };
}
