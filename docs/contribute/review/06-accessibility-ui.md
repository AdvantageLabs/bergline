# Accessibility And UI Review

Check whether frontend changes are usable, accessible, and visually stable across realistic states.

## Design Judgment

Respect intentional design choices from the issue spec, product direction, mocks, existing UI, or surrounding implementation.

Do not treat personal taste as a review finding. Do not ask for visual changes only because another layout, color, spacing, copy style, or interaction pattern might be preferable.

Flag design-related issues only when there is a concrete problem:

- The UI contradicts the issue spec, mock, or acceptance criteria.
- The change breaks an established product pattern without an explicit reason.
- The design choice creates accessibility, usability, responsiveness, or clarity problems.
- The UI state makes the user's next action or system status ambiguous.

If the design intent is unclear, ask for clarification instead of inventing a preferred design.

## Accessibility

Flag issues where:

- Interactive elements are not reachable or usable by keyboard.
- Buttons, links, inputs, icons, or images lack useful accessible names.
- Focus states are missing or hard to see.
- Color contrast is too low.
- Disabled, loading, and error states are unclear.
- Motion or animation lacks a reduced-motion fallback when needed.

## UI Behavior

Check whether the UI works across:

- Mobile and desktop viewports.
- Long text and translated copy.
- Empty, loading, error, and success states.
- Slow network or repeated user actions.

## What To Flag

- Text overlap, clipping, layout shifts, or horizontal scrolling.
- Click targets that are too small or unclear.
- UI states that contradict the user action.
- New visual patterns that conflict with the existing product.

Tie comments to changed UI behavior. Do not ask for broad redesigns unless the change creates a concrete usability or accessibility problem.
