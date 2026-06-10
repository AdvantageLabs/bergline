# Security And Privacy Review

Security and privacy comments should be precise and high signal.

## Security

Flag changes that may introduce:

- Broken authorization, permissions, or access control.
- Trust in client-controlled data.
- Exposure of secrets, tokens, private config, internal URLs, or credentials.
- Unsafe redirects, URL handling, path construction, or file access.
- Injection risks in HTML, SQL, shell commands, logs, templates, or generated content.
- Dependency or build changes that weaken supply-chain safety.

## Personal Data

Flag changes that may collect, expose, store, or transmit personal data in a way that is unnecessary or unclear.

Examples include:

- Collect more personal data than the feature needs.
- Send user data to a third party without a clear need.
- Store sensitive data in logs, analytics, local storage, URLs, or error messages.
- Make private user state visible in metadata, screenshots, caches, or public pages.
- Add tracking, cookies, identifiers, or analytics events without a clear product reason.

## Data Handling

- Check whether user data is minimized.
- Check whether sensitive values are kept out of client-visible code when possible.
- Check whether retention, caching, and logging are appropriate for the data.
- Check whether consent or disclosure is needed for new data collection.

## Comment Standard

For security and privacy issues, include:

- The affected data, user, permission, or secret.
- Where it is collected, stored, exposed, or transmitted.
- Why that is unnecessary or risky.
- A concrete mitigation.

Do not make broad security or privacy claims without tying them to changed code.
