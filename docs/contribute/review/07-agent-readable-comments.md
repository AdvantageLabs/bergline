# Agent-Readable Review Comments

Write review comments so they can be acted on by either a human developer or an implementation agent.

A review comment is a repair instruction. It should identify a concrete problem, explain why it matters, and give enough context for the next actor to make a focused fix without guessing.

## Comment Only When Actionable

Leave a comment only when:

- The issue is tied to changed code.
- The risk is concrete.
- The expected fix is reasonably scoped to this PR.
- The comment gives enough context for another actor to implement the fix.
- The issue affects feature behavior, regressions, tests, PR template quality, security/privacy, accessibility, or spec adherence.

Do not leave comments for vague concerns, subjective style preferences, or optional improvements unless they prevent a real risk.

## Required Comment Shape

Every comment should include:

- Problem: what is wrong.
- Impact: what can break or become unsafe/confusing.
- Expected behavior: what should happen instead.
- Fix direction: the smallest useful change, without over-prescribing implementation.
- Verification: what should be checked after the fix, when relevant.

## Make Comments Easy To Execute

When possible:

- Name the exact scenario that fails.
- Mention the relevant condition, input, state, or user role.
- Point to the existing pattern or component that should be reused.
- Say whether the fix should be local or whether callers/tests also need updates.
- Keep the requested change narrow.

Avoid vague phrasing such as:

- "Consider improving this."
- "This might be cleaner."
- "Maybe add tests."
- "Can we make this better?"
- "This feels wrong."

Use direct, bounded language instead:

- "Add a test for the unauthorized user path."
- "Reuse the existing empty state component here."
- "Return early when `items.length === 0`."
- "Update the PR description to include the migration step."

## Avoid Bad Repair Tasks

Do not ask for broad rewrites unless the changed code creates a real architectural or behavioral risk.

Do not combine unrelated issues in one comment. If two fixes require different code changes, leave separate comments.

Do not ask another actor to infer product requirements that are not in the PR, issue, or spec. If the requirement is ambiguous, say what is ambiguous and what decision is needed.

## Noise Control

Do not comment on formatting, lint, or type errors when CI already reports them clearly.

Do not repeat the same root issue across multiple lines. Prefer one clear comment that describes the shared cause and the expected fix.
