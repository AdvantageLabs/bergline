# Specification Adherence Review

Check whether the pull request follows the linked issue, product specification, and acceptance criteria.

## Main Question

Does the implementation match what was asked for, without missing requirements or adding unrelated behavior?

## What To Compare

- PR title and description.
- Linked issue, Linear ticket, GitHub issue, or product spec.
- Acceptance criteria, screenshots, mocks, comments, and edge cases.
- Any explicit non-goals or constraints.

## What To Flag

- Required behavior from the spec is missing.
- Implemented behavior contradicts the spec.
- The PR handles only the happy path when the spec requires edge cases.
- The PR adds extra behavior that was not requested and increases risk.
- User-facing copy, routes, states, permissions, or data shapes differ from the spec.
- The implementation changes the scope of the ticket without making that scope change explicit.

## If The Spec Is Ambiguous

Do not invent requirements. State the ambiguity and ask for clarification only when it affects correctness, user behavior, or merge safety.

When possible, quote or paraphrase the relevant spec requirement and explain how the code diverges.
