# Validation

Updated for version 1.1.0 on 5 November 2026.

- The dependency-free static build completed for all seven pages (six primary sections plus sources/credits).
- `npm run check` verified 180 local references, unique element IDs, one main heading per page, English document language, internal fragments and booking URL validation.
- JavaScript syntax checks passed.
- A separate DOM-emulation check passed 59 assertions across menu controls, carousel arrows/dots/postcard focus, keyboard navigation, swipe handling, playback/pause, one/two/five-image collections, publication search/year/type filters, empty states/reset, news categories and instrument categories.
- A further 88 redesign assertions passed: full-width gallery structure, zero rotation, active-photo position and scale, captions/credits following the selection, four stage-width inputs, reduced-motion behaviour, observer fallback, stylesheet parsing, minimum explicit text sizes of 14 px, desktop body size of 18 px, slim frames and contrast checks for the main text/background combinations.
- Local image files were inspected, including the genuine DEIB PI portrait. The bundled font is a valid WOFF2 variable font.
- The owner confirmed the first iteration works completely. Browser-rendered visual verification of this redesign remains unavailable in the restricted execution environment; DOM checks do not substitute for it. Open `index.html` or serve the folder locally to review the updated desktop and phone layouts.

The project has no runtime dependencies. The temporary test environment and downloaded test browser are not part of the delivery.
