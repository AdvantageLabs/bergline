---
name: get-ready-for-hr
description: Prepare a pull request for human review with a complete description, evidence, and reviewer handoff.
---

# Get Ready For HR

Use this skill when a PR needs to be made ready for human review.

HR means human review.

This skill should be used after the implementation exists and the PR is already
technically close to mergeable. If the branch is stale, conflicted, or failing
required checks because of the PR changes, use `get-ready-to-merge` first.

## Required Workflow

1. Identify the PR, Linear issue, spec source, base branch, and reviewer audience.
2. Inspect the PR diff, commits, current CI state, review state, and PR template.
3. Confirm the PR is technically ready enough for review:
   - intended files only
   - no obvious debug code or local-only artifacts
   - relevant validation has passed or is documented
   - visible changes have screenshots or videos
   - no known merge conflicts
4. Rewrite or update the PR description so a reviewer can understand the work
   without reading the full agent transcript.
5. Add review guidance that names the most important areas to inspect.
6. Call out risks, tradeoffs, rollout notes, and follow-ups.
7. If the PR is a draft and all readiness criteria pass, mark it ready for human
   review.
8. Post or return a concise handoff summary with the PR URL, validation evidence,
   and recommended reviewer focus.

## PR Description Checklist

- [ ] Motivation includes the Linear issue link or identifier.
- [ ] Spec section links the spec or states "No separate spec."
- [ ] What changed is written in plain language.
- [ ] Screenshot section includes evidence for visible changes or states "Not
      applicable: no visible changes."
- [ ] Things to consider includes risks, rollout notes, follow-ups, or "None."
- [ ] Validation commands and outcomes are included.
- [ ] Placeholder template comments have been removed.
- [ ] Stacked PRs explain their base branch and position in the stack.

## Human Review Handoff

Use this format when reporting readiness:

```markdown
Ready for HR: yes/no
PR:
Issue:
Validation:
Reviewer focus:
Remaining risks:
```

## Do Not Mark Ready When

- CI required for review is still failing for reasons caused by the PR.
- The PR description still has placeholders.
- Screenshots or videos are missing for visible UI changes.
- The diff contains unrelated changes.
- The implementation does not satisfy the Linear spec.
- The PR is part of a stack and a lower branch still needs required fixes that
  will change this branch.
