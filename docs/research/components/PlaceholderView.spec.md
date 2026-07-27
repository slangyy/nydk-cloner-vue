# PlaceholderView Specification

## Overview

- Target: `src/views/PlaceholderView.vue`
- Interaction model: router-driven

## Behavior

- `/` is the only fully cloned page.
- Any other same-origin path renders this view through the Vue Router catch-all.
- Known legacy paths map to readable Chinese/English titles; unknown paths use “页面待还原”.
- Provide a local return-home action.
- Header uses the solid light state and the shared footer remains available.

## Scope

- No inner-page visual cloning, backend requests, search implementation or synthetic content.
