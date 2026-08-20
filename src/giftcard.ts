export interface GiftCard {
  code: string;
  balanceCents: number;
}

const GIFT_CARDS: GiftCard[] = [
  { code: 'GC-WELCOME-25', balanceCents: 2_500 },
  { code: 'GC-VIP-100', balanceCents: 10_000 },
];

export function lookupGiftCard(code: string): GiftCard | undefined {
  return GIFT_CARDS.find((g) => g.code === code.trim().toUpperCase());
}

/** Amount of the card that can be used against this total (never negative). */
export function redeemableCents(card: GiftCard, totalCents: number): number {
  return Math.max(0, Math.min(card.balanceCents, totalCents));
}
