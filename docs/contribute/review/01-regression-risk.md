# Regression Risk Review

Focus on behavior that used to work and could now break.

## High-Risk Changes

Pay extra attention when a PR changes:

- Routing, redirects, navigation, or layout hierarchy.
- Authentication, authorization, permissions, or user identity.
- Data fetching, caching, persistence, serialization, or API contracts.
- Shared components, shared utilities, global styles, or configuration.
- Build, lint, formatting, deployment, or package dependencies.

## Regression Checks

- Identify existing behavior that depends on changed code.
- Check whether defaults, fallbacks, and error handling still work.
- Look for changes that silently alter public URLs, metadata, accessibility labels, or analytics behavior.
- Check whether removing code also removes the last user of a path, asset, style, or dependency.

## Backward Compatibility

- Flag breaking API or data shape changes unless the PR updates all known callers.
- Flag configuration changes that require coordinated deployment steps.
- Flag changes that are safe locally but likely to fail in CI, production, or a clean install.

When possible, state the specific scenario that would regress.
