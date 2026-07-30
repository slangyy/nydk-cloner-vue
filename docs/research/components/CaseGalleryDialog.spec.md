# CaseGalleryDialog Specification

## Overview

- Target: `src/components/cases/CaseGalleryDialog.vue`
- Reference: user-provided full-screen gallery screenshot, restyled with existing South Sea Dico colors and typography.
- Interaction model: click, keyboard and horizontal swipe driven.

## Desktop layout

- Full viewport native modal dialog with a dark media area and warm-brown information sidebar.
- Media area contains counter/caption, contained active image, previous/next controls and horizontal thumbnails.
- Sidebar contains title, optional location/series, summary, tags and a close button.
- No share, feedback, statistics, author, like or cross-case navigation controls.

## Behavior

- Opens on the cover image and resets to index zero for every case.
- Supports thumbnail selection, wrapping previous/next controls, arrow keys and mobile swipe.
- Escape, close button and backdrop click close the dialog.
- Body scrolling is locked while open; focus returns to the poster trigger on close.
- A one-image case hides the thumbnail rail and navigation arrows.

## Responsive behavior

- At 998px and below the viewer stacks above a scrollable information section.
- Mobile keeps the active image prominent, uses a horizontal thumbnail strip and fixed close control.
- Motion is removed under `prefers-reduced-motion`.
