# Pull Request Template Review

Check whether the pull request description follows the project PR template and gives reviewers enough context to review safely.

## Main Question

Did the author complete the PR template honestly and usefully?

## What To Check

- The PR explains what changed and why.
- The PR links the relevant issue, ticket, or spec when one exists.
- Required template sections are not deleted, skipped, or filled with placeholders.
- Required checkboxes are completed or explicitly marked as not applicable with a reason.
- Testing or verification steps are listed and match the actual change.
- Screenshots, recordings, or before/after notes are included when UI behavior changes.
- Migration steps, environment variables, dependency changes, rollout notes, or operational risks are called out when relevant.

## What To Flag

- The PR template is missing or mostly empty.
- The linked issue/spec is absent and the PR needs it to be reviewable.
- The stated testing does not match the changed behavior.
- The PR claims "no tests needed" without a credible reason for a risky change.
- A required screenshot, migration note, config note, or rollout note is missing.
- The description says one thing but the diff does another.

## Comment Standard

Ask for template fixes only when missing information makes the PR harder or riskier to review.

Do not block on minor wording issues when the intent, scope, testing, and risk are already clear.
