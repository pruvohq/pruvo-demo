# pruvo-demo

Demo repository for **pruvo** — AI-generated manual test cases for every pull
request, tracked with QA sign-off.

This is a small checkout module (cart, coupons, shipping, totals). It has **no
CI, no workflows and no secrets** — that's the point: pruvo needs none. With
the pruvo GitHub App installed on the repo, opening a pull request is enough:
pruvo reads the diff and the changed files, writes the manual test cases that
change actually needs (new behavior + its regression surface), tracks them in
the dashboard, and comments the plan on the PR.

Two open pull requests show the range:

- **[#3 — Gift cards at checkout](https://github.com/pruvohq/pruvo-demo/pull/3)** — a backend change
  (`src/giftcard.ts` + checkout math): pruvo generates cases for redemption
  rules, caps, and the regression surface around totals.
- **[#2 — Free-shipping progress nudge](https://github.com/pruvohq/pruvo-demo/pull/2)** — a frontend change
  (`web/FreeShippingNudge.tsx` + cart UI): pruvo generates manual UI cases —
  visual states, threshold boundaries, coupon interaction, accessibility.
