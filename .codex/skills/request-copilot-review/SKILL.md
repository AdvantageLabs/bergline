---
name: request-copilot-review
description: Request GitHub Copilot code review on a pull request and verify the request was accepted.
---

# Request Copilot Review

Use this skill when the user wants GitHub Copilot to review a pull request.

Run:

```bash
gh pr edit <PR> --repo <owner/repo> --add-reviewer @copilot
```

Do not assume `gh pr view --json reviewRequests` is enough to verify it. Confirm
the PR timeline gets a `PullRequestReview` from `copilot-pull-request-reviewer`
on the current head SHA. A `ReviewRequestedEvent` only means GitHub accepted the
request; if no review appears, report that Copilot was requested but did not
review.
