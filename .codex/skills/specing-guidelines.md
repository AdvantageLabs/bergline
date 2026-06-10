# Specing Guidelines

Use this checklist to decide whether a Linear issue is ready for implementation.
The standard is practical completeness: the next engineer should be able to build
the requested change without guessing at scope, behavior, constraints, or
validation.

## Required Sections

### Problem

- State the user-facing or operational problem in one or two concrete sentences.
- Name the affected user, workflow, system, or team.
- Explain why the change matters now.

### Desired Outcome

- Describe the final behavior or artifact.
- Include the business, product, or engineering outcome the work should produce.
- Link to relevant context such as designs, docs, Slack threads, PRs, customer
  requests, or prior Linear issues.

### Scope

- List what is in scope.
- List explicit non-goals.
- Define ownership boundaries when the work crosses apps, packages, services, or
  teams.

### Acceptance Criteria

- Write testable criteria in observable language.
- Cover success paths, important edge cases, and failure states.
- Include UX, API, data, security, performance, accessibility, or analytics
  expectations when relevant.

### Implementation Notes

- Capture known constraints, preferred approaches, or technical decisions.
- Name files, modules, commands, migrations, feature flags, config, or external
  dependencies when known.
- Call out open risks and how they should be reduced.

### Validation

- Specify checks the implementer should run.
- Include manual QA steps when automated coverage is insufficient.
- State how screenshots, logs, fixtures, or test data should be captured.

### Release And Review

- Note rollout, migration, deployment, support, docs, or communication steps.
- Identify whether screenshots, videos, review focus areas, or reviewer expertise
  are needed.
- List follow-up work that should not block this issue.

## Completeness Gate

A Linear issue is ready for implementation only when all of the following are
true:

- A reader can describe the change in their own words after reading the issue.
- Every acceptance criterion can be verified.
- Non-goals prevent obvious scope creep.
- Dependencies and risks are explicit.
- The validation path is clear.
- Remaining unknowns are either resolved or intentionally moved to follow-up
  issues.

If any item is missing, ask the user focused questions before updating the issue
or moving to implementation.
