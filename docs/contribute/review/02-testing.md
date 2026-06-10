# Testing Review

Ask for tests when they protect meaningful behavior. Do not request tests just to increase test count.

## When Tests Are Expected

Tests or equivalent verification are expected when a PR:

- Changes user-visible behavior.
- Fixes a bug that could reappear.
- Adds branching logic, validation, authorization, parsing, or error handling.
- Changes shared utilities, reusable components, or API contracts.
- Touches behavior that is hard to verify manually.

## What To Check

- Does the test fail against the old bug or missing behavior?
- Does it cover important edge cases, not only the happy path?
- Is the test located near similar tests and written in the project's existing style?
- Does the PR update snapshots or fixtures intentionally?

## When Manual Verification Is Enough

Manual verification can be enough for copy-only changes, simple static content, small visual tweaks, or changes already covered by existing tests.

If tests are missing, explain the risk and suggest the smallest useful coverage. Prefer a concrete case over a generic "add tests" comment.
