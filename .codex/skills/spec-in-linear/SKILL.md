---
name: spec-in-linear
description: Turn a Linear issue into a complete implementation spec before build work starts, using focused questions and Linear updates.
---

# Spec In Linear

Use this skill when the user asks to clarify, write, or complete a Linear issue
spec before implementation.

This skill is intentionally blocking. Do not let the work move into
implementation until the issue satisfies `../specing-guidelines.md`.

## Required Workflow

1. Read the target Linear issue, its parent issue, sub-issues, linked documents,
   comments, attachments, and relevant relations.
2. Create or adopt a goal whose objective is to make the Linear issue satisfy
   `../specing-guidelines.md`.
3. Extract the current spec into these sections:
   - Problem
   - Desired Outcome
   - Scope
   - Acceptance Criteria
   - Implementation Notes
   - Validation
   - Release And Review
4. Compare the extracted spec against the guidelines and list the exact gaps.
5. Ask the user the smallest useful batch of questions needed to close the
   highest-impact gaps. Prefer one to three questions at a time.
6. Repeat the question loop until the completeness gate passes.
7. Rewrite the Linear issue description with the complete spec.
8. Add a short Linear comment summarizing what changed and any follow-up issues
   that should be created.
9. Stop and tell the user the issue is ready for implementation.

## Question Rules

- Ask concrete questions with enough context that the user can answer quickly.
- Avoid broad prompts such as "Anything else?" unless the spec is already nearly
  complete.
- If the user gives an ambiguous answer, restate the likely interpretation and
  ask for confirmation before writing it into Linear.
- If the user explicitly says a detail is unknown, capture the unknown as a risk,
  assumption, or follow-up issue instead of silently omitting it.
- Do not ask about details already answered by the issue, linked artifacts, or
  repository context.

## Linear Update Format

Use this Markdown structure for the issue description:

```markdown
## Problem

## Desired Outcome

## Scope

### In Scope

### Non-goals

## Acceptance Criteria

## Implementation Notes

## Validation

## Release And Review

## Follow-ups
```

Keep the issue concise enough to read quickly, but complete enough to remove
implementation ambiguity.

## Completion Rule

The skill is complete only after the Linear issue has been updated and the final
issue description passes every item in the completeness gate. If Linear is not
available, produce the proposed issue description in the conversation and clearly
state that the issue still needs to be updated.
