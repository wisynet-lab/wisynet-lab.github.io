# Extending WiSyNet

## Structure

JSON content → page renderers → shared layout → static HTML. Browser JavaScript adds carousel, navigation and filtering behaviour. The deployed site does not fetch content or depend on a backend.

`scripts/lib/components.mjs` provides shared cards, escaping, icons and booking-link validation. `scripts/lib/layout.mjs` provides navigation, footer and document metadata. Each file in `scripts/pages/` owns one section. These boundaries keep future sections independent.

## External booking forms

`getBookingLink(site, instrument)` resolves an instrument's `bookingUrl` first, then a global `booking.url` when the global `mode` is `external`. URLs must use HTTPS. The output is a normal link: the external provider owns submission, authentication and confirmations. Nothing in this site claims a reservation has succeeded.

A Google Form can collect instrument, proposed date/time, purpose and contact details. Store its real prefilled link in each instrument's `bookingUrl` if desired. This website does not yet map query parameters or make bookings automatically.

## Snipe-IT options

1. **Portal link:** supply a complete authenticated portal URL per instrument. No integration code or token is needed in the public site.
2. **Public export:** an authorised server job reads inventory and exports only approved public fields to `content/instruments.json`. Rebuild the website. Add a “last updated” field/display if freshness becomes important.
3. **Live integration:** a separate authenticated service keeps secrets, implements access control and validates requests. The static website may later link to it. This service is not included in the starter.

Inventory status and instrument reservation calendars are different data concerns; choose and configure the appropriate booking service separately. Do not expose private serial numbers, internal URLs or borrower details accidentally through the public content files. Changing an asset identifier does not itself activate an integration.

## Accessibility and dependencies

Navigation is visible without JavaScript; the mobile toggle is enabled only when scripting is available. Galleries fall back to a horizontally scrollable image list. Filters are hidden until enhanced, so all records remain accessible without scripting. Native `details` elements expose course information and BibTeX. Reduced-motion preferences remove animations, and playback is always user-initiated.

Runtime dependencies: none. Build dependencies: Node.js 20+ standard library only. Local preview: any static HTTP server. Included CSS uses Grid, Flexbox, custom properties, transforms and media queries supported by modern browsers.
