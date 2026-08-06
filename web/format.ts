/** Formats integer cents as USD for display — money math stays in cents. */
export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
