---
name: review-sweep
description: Address or explicitly push back on every open piece of pull request review feedback.
---

# Review Sweep

Use this skill when a pull request has review feedback from humans, Copilot,
CodeRabbit, CI bots, or other reviewers and the user wants the feedback handled
end to end.

A review sweep means every open feedback item is examined and ends with one of
two outcomes:

- Patched: the requested change was made, validated, referenced in a reply to
  the original feedback, and the thread was resolved when appropriate.
- Pushed back: no patch was made, the rationale was explained in a reply to the
  original feedback, and the thread was left open or resolved according to the
  repository's review norms.

## Required Workflow

1. Identify the PR, repository, head branch, base branch, and associated Linear
   issue.
2. Fetch the latest branch state and inspect the current worktree.
3. Collect every open feedback source:
   - unresolved inline review threads
   - unresolved review comments
   - top-level PR comments that request changes
   - review submissions requesting changes or leaving actionable comments
   - Copilot comments with suggestions or findings
   - bot comments that report actionable failures
4. Build a feedback ledger with one entry per actionable item:
   - source reviewer
   - original thread or comment URL
   - file and line, when available
   - requested change
   - decision: patch, push back, duplicate, stale, or needs clarification
   - evidence needed before resolving
5. Handle feedback item by item. Prefer small, reviewable commits grouped by one
   feedback item or a tightly related collection of feedback items.
6. For each patched item:
   - make the code or documentation change
   - run the relevant validation
   - commit with a message that references the feedback or issue
   - reply in the original thread with the commit SHA and validation evidence
   - resolve the thread when the requested change is fully addressed
7. For each pushback:
   - explain why the requested change is not being made
   - cite code, product scope, spec text, validation, or tradeoffs
   - ask for confirmation when the decision depends on reviewer judgment
   - do not resolve the thread unless the local norm allows resolving after a
     clear no-change response
8. Push the updated branch after the sweep.
9. Re-check open feedback and CI after pushing.
10. Finish with a concise sweep report.

## Feedback Ledger Format

```markdown
| ID  | Source | Request | Decision | Evidence | Status |
| --- | ------ | ------- | -------- | -------- | ------ |
| 1   | URL    | ...     | patch    | commit   | done   |
```

Keep the ledger private while working unless the user asks for it or it is useful
as a PR summary comment.

## Commit Rules

- Keep commits specific to review feedback.
- Use a separate commit when two feedback items are unrelated.
- Batch related comments only when they affect the same code path or
  documentation section.
- Do not mix unrelated cleanup into review-sweep commits.
- If a reviewer supplied an exact suggested change, still inspect it before
  applying it.

## Reply Rules

Reply in the original feedback thread whenever the platform supports threaded
replies.

Patched reply:

```markdown
Addressed in <commit-sha>. Validation: <command or check>.
```

Pushback reply:

```markdown
I did not make this change because <reason>. <Evidence or tradeoff>. Happy to
adjust if you want this behavior changed.
```

If the feedback source cannot be replied to directly, add a PR comment that links
to the original item.

## Resolution Rules

- Resolve a thread only after the patch or rationale has been posted.
- Do not resolve unresolved reviewer questions that still need a decision.
- Do not resolve feedback by silently making a change without replying.
- If the tool cannot resolve threads programmatically, state that manual
  resolution is still required and link the remaining threads.

## Final Report

Include:

- number of feedback items reviewed
- patched items with commit SHAs
- pushbacks with links to replies
- unresolved or blocked items
- validation run
- PR URL and current CI state
