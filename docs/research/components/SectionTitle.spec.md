# SectionTitle Specification

## Overview

- Target: `src/components/SectionTitle.vue`
- Interaction model: static

## Props

- `english?: string`
- `chinese: string`
- `subtitle?: string`
- `theme?: "light" | "dark"`
- `align?: "center" | "left"`
- `variant?: "default" | "feature"`
- `watermarkImage?: string`

## Styles

- Bank font for English label.
- Watermark N centered behind title. Existing callers may supply the local N
  background asset through `watermarkImage`; when omitted, retain the original
  text N fallback.
- Light theme: English `#634f44`, Chinese `#231815`, line `#bc9480`.
- Dark theme: all visible text, subtitle and line white.
- English: `clamp(22px, 2.1vw, 38px)`, weight `400`, line height `1.05`,
  letter spacing `0.03em`.
- Chinese: `clamp(25px, 2vw, 36px)`, weight `500`, letter spacing `0.05em`.
- Subtitle: `clamp(18px, 1.4vw, 26px)`.
- Divider: `70px × 2px` with `18px / 12px` vertical margins; mobile
  `54px × 2px` with `10px / 8px` margins.
- Desktop title vertical padding 60px; watermark about 158px.
- Mobile English is `clamp(16px, 4.6vw, 20px)` with `1.08` line height and
  `0.02em` letter spacing; Chinese remains `24px`; watermark about 80px.
- With English, order is watermark, English, divider, Chinese and optional subtitle.
- Without English, order is watermark, Chinese, optional subtitle and divider.
- Feature variant is shared by HomeSystemsSection and DesignInstituteSection:
  it keeps their shared spacing and supplied N watermark image positioning while
  consuming the global title typography.
