# pruvo-demo

Demo repository for **Pruvo** — AI-generated manual test cases for every pull
request, tracked with QA sign-off.

This is a small checkout module (cart, coupons, shipping, totals). It has **no
CI, no workflows and no secrets** — that's the point: Pruvo needs none. With
the Pruvo GitHub App installed on the repo, opening a pull request is enough:
Pruvo reads the diff and the changed files, writes the manual test cases that
change actually needs (new behavior + its regression surface), tracks them in
the dashboard, and comments the plan on the PR.

Two open pull requests show the range:

- **[#1 — Gift cards at checkout](https://github.com/pruvohq/pruvo-demo/pull/1)** — a backend change
  (`src/giftcard.ts` + checkout math): Pruvo generates cases for redemption
  rules, caps, and the regression surface around totals.
- **[#2 — Free-shipping progress nudge](https://github.com/pruvohq/pruvo-demo/pull/2)** — a frontend change
  (`web/FreeShippingNudge.tsx` + cart UI): Pruvo generates manual UI cases —
  visual states, threshold boundaries, coupon interaction, accessibility.
