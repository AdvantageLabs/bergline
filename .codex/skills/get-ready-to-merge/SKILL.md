---
name: get-ready-to-merge
description: Prepare a pull request branch so it is current, validated, and technically mergeable.
---

# Get Ready To Merge

Use this skill when a PR exists and needs final technical cleanup before merge.

This skill focuses on technical merge readiness. Use `get-ready-for-hr` when the
PR still needs narrative cleanup or reviewer handoff.

## Required Workflow

1. Identify the PR, head branch, base branch, repository, and associated Linear
   issue.
2. Inspect current state:
   - PR mergeability
   - CI and required checks
   - review decisions and unresolved threads
   - branch protection requirements
   - whether the head branch is behind the base branch
3. Fetch the latest remote refs.
4. Choose the least disruptive update strategy that matches repo conventions:
   - rebase onto base when linear history is expected
   - merge base into head when the repo prefers merge commits
   - retarget stacked PRs only when the stack order is wrong
5. Resolve conflicts without dropping intended changes.
6. Rerun required validation locally when feasible.
7. Push the updated branch.
8. Re-check PR status after the push.
9. Report whether the PR is technically mergeable and list any remaining
   blockers.

## Merge Readiness Checklist

- [ ] Head branch contains only intended commits.
- [ ] Branch is up to date with the intended base.
- [ ] Conflicts are resolved.
- [ ] Required local validation passed or is explicitly blocked.
- [ ] Required CI is passing, pending, or has a named external blocker.
- [ ] Required reviews are approved or clearly listed as outstanding.
- [ ] No unresolved review threads block merge.
- [ ] Stacked PR base branch is correct, if applicable.

## Conflict Rules

- Read both sides of a conflict before editing.
- Preserve user-authored changes unless the spec or reviewer explicitly requires
  replacing them.
- If a conflict changes product behavior beyond the PR scope, stop and ask for a
  decision.
- After resolving conflicts, inspect the final diff against the PR base.

## Blocker Report

When the PR cannot be made merge-ready, report blockers in this form:

```markdown
### Merge blockers

- Blocker:
  Evidence:
  Owner or next action:
```

Update Linear or the PR conversation when the blocker affects scheduling,
ownership, or scope.
