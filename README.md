# pruvo-demo

Demo repository for **Pruvo** — AI-generated manual test cases for every pull
request, tracked with QA sign-off.

This is a small checkout module (cart, coupons, shipping, totals). It has **no
CI, no workflows and no secrets** — that's the point: Pruvo needs none. With
the Pruvo GitHub App installed on the repo, opening a pull request is enough:
Pruvo reads the diff and the changed files, writes the manual test cases that
change actually needs (new behavior + its regression surface), tracks them in
the dashboard, and comments the plan on the PR.

See the open pull request for a live example.
