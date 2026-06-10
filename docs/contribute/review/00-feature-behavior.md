# Feature Behavior Review

Check whether the changed feature works and does what it is supposed to do from a product and runtime behavior perspective.

## Main Question

Would a real user or caller get the expected result from this change?

## What To Check

- The primary happy path works end to end.
- The feature handles loading, empty, error, and retry states when relevant.
- Inputs, defaults, disabled states, and validation behave correctly.
- Navigation, redirects, metadata, and visible copy match the intended behavior.
- Server/client boundaries, async behavior, and state updates are coherent.
- The change works in a clean environment, not only with local state or cached data.

## Edge Cases

- First item, last item, zero items, and long content.
- Missing optional data and unexpected null values.
- Slow networks, failed requests, and repeated user actions.
- Mobile and desktop behavior when the change affects UI.

## Review Standard

Leave a comment when changed code is likely to produce incorrect behavior, broken user experience, or confusing output.

Explain the concrete scenario that fails and suggest the smallest useful fix.
