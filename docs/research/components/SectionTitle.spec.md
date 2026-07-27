# SectionTitle Specification

## Overview

- Target: `src/components/SectionTitle.vue`
- Interaction model: static

## Props

- `english: string`
- `chinese: string`
- `theme?: "light" | "dark"`
- `align?: "center" | "left"`

## Styles

- Bank font for English label.
- Watermark N centered behind title, local background asset.
- Light theme: English `#634f44`, Chinese `#231815`, line `#bc9480`.
- Dark theme: all visible text and line white.
- Desktop title vertical padding 60px; watermark about 158px.
- Mobile title padding about 30px; watermark about 80px.
