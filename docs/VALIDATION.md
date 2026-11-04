# Validation

Validated on 4 November 2026.

- The dependency-free static build completed for all seven pages (six primary sections plus sources/credits).
- `npm run check` verified 180 local references, unique element IDs, one main heading per page, English document language, internal fragments and booking URL validation.
- JavaScript syntax checks passed.
- A separate DOM-emulation check passed 59 assertions across menu controls, carousel arrows/dots/postcard focus, keyboard navigation, swipe handling, playback/pause, one/two/five-image collections, publication search/year/type filters, empty states/reset, news categories and instrument categories.
- Local image files were inspected, including the genuine DEIB PI portrait. The bundled font is a valid WOFF2 variable font.
- Browser-rendered visual verification could not be completed in the restricted execution environment. DOM checks do not substitute for visual testing. Open `index.html` or serve the folder locally to review desktop and phone layouts before public launch.

The project has no runtime dependencies. The temporary test environment and downloaded test browser are not part of the delivery.
