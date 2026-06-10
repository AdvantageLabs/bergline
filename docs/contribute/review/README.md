# Review Guidance

This folder contains AI-agnostic pull request review instructions.

The files here are the source of truth for automated and human-assisted reviews. Tool-specific entrypoints, such as `.github/copilot-instructions.md`, should point to these files instead of duplicating the rules.

Recommended reading order:

1. `00-feature-behavior.md`
2. `01-regression-risk.md`
3. `02-testing.md`
4. `03-pr-template.md`
5. `04-security-privacy.md`
6. `05-spec-adherence.md`
7. `06-accessibility-ui.md`
8. `07-agent-readable-comments.md`

Keep each file focused and short. If a rule becomes tool-specific, put it in the tool adapter instead of this folder.
