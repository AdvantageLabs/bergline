---
name: request-copilot-review
description: Request GitHub Copilot code review on a pull request and verify Copilot actually reviewed the current head.
---

# Request Copilot Review

Use this skill when the user wants GitHub Copilot to review a pull request.

Try the CLI first:

```bash
gh pr edit <PR> --repo <owner/repo> --add-reviewer @copilot
```

If that fails, report the exact error and use the GitHub UI fallback: open the
PR reviewers menu and select Copilot.

Do not assume `gh pr view --json reviewRequests` is enough to verify it. Confirm
the PR timeline gets a `PullRequestReview` from `copilot-pull-request-reviewer`
on the current head SHA. A `ReviewRequestedEvent` only means GitHub accepted the
request; if no review appears, report that Copilot was requested but did not
review.

Copilot feedback is non-blocking; handle any comments with `review-sweep`.
