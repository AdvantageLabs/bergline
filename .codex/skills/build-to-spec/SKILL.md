---
name: build-to-spec
description: Implement code changes against a complete Linear spec and validate each acceptance criterion.
---

# Build To Spec

Use this skill when a Linear issue already has a complete spec and the user wants
the implementation completed.

Do not use this skill to invent missing requirements. If the issue does not
satisfy `../specing-guidelines.md`, stop and use the `spec-in-linear` workflow
first.

## Required Workflow

1. Read the Linear issue, parent issue, linked docs, comments, and related PRs.
2. Confirm the issue has a complete spec with acceptance criteria and validation
   instructions.
3. Create or adopt a goal whose objective is to satisfy the Linear spec exactly.
4. Restate the implementation target in plain language, including explicit
   non-goals.
5. Inspect the codebase before editing:
   - local conventions and ownership boundaries
   - relevant existing tests
   - package scripts and CI checks
   - prior implementations of similar behavior
6. Build the smallest coherent implementation that satisfies the spec.
7. Keep a running acceptance checklist and map every code change to at least one
   criterion or implementation note.
8. Run the validation named in the spec. If the spec is incomplete about
   validation, run the closest local checks and explain the gap.
9. Update Linear with a short implementation note when:
   - the work is complete
   - a blocker changes the plan
   - the spec needs clarification before continuing
10. Stop when the acceptance checklist passes, validation has been run or clearly
    blocked, and the worktree contains only intended changes.

## Implementation Rules

- Prefer the repository's existing patterns over new abstractions.
- Keep edits scoped to the files and behavior implied by the spec.
- Do not expand scope just because adjacent cleanup is visible.
- Do not silently change product behavior outside the acceptance criteria.
- Add or update tests when the change affects shared behavior, contracts, or
  user-facing flows.
- Preserve unrelated user changes in the worktree.

## Acceptance Checklist Format

Track criteria while working in this form:

```markdown
- [ ] Criterion: ...
      Evidence: code path, test, screenshot, log, or manual check
```

Before finishing, every item must be checked or explicitly called out as blocked
with the reason.

## Blockers

If implementation reveals missing spec detail, stop and ask focused questions.
Record the blocker in Linear if it materially changes scope, timing, or the
implementation plan.
