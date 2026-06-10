---
name: create-pr
description: Package completed local work into a scoped GitHub pull request with validation and a reviewer-ready description.
---

# Create PR

Use this skill when implementation work is complete and the user wants a pull
request opened.

This skill packages work; it should not make product or implementation changes
unless required to fix validation or PR metadata.

## Required Workflow

1. Inspect repository state:
   - `git status -sb`
   - current branch
   - upstream branch
   - full diff for unstaged and staged changes
2. Confirm the intended PR scope from the Linear issue, completed spec, or user
   request.
3. If unrelated changes are present, stage only the intended paths and leave the
   rest untouched.
4. Run the validation required by the spec or the closest local checks available.
5. Fix validation failures that are clearly caused by the intended changes. Stop
   and report failures that are unrelated or require product decisions.
6. Commit with a terse message that includes the issue identifier when one
   exists.
7. Push the branch with upstream tracking.
8. Open a draft PR unless the user explicitly asks for a ready PR.
9. Fill the repository PR template completely.
10. Return the PR URL, branch, commit, validation results, and any review notes.

## PR Description Requirements

Use the repository template if one exists. Remove placeholder comments before
opening the PR.

The description must include:

- Issue link or identifier.
- Spec link or "No separate spec."
- Plain-language change summary.
- Screenshot or video section for visible changes, or an explicit "not
  applicable" note.
- Things reviewers should consider before merge.
- Validation commands and outcomes.

## Draft PR Defaults

- Open draft PRs by default.
- Target the repository default branch unless the user requests a stacked PR or a
  different base.
- For stacked PRs, target the previous branch in the stack and state that in the
  PR body.
- Enable maintainer edits when the hosting provider supports it.

## Safety Rules

- Never use `git add -A` when the worktree contains unrelated changes.
- Never rewrite user changes to make the diff cleaner.
- Never push secrets, local config, generated credentials, or transient build
  output.
- Do not mark a PR ready for human review from this skill; use
  `get-ready-for-hr` after the PR is technically and narratively ready.
