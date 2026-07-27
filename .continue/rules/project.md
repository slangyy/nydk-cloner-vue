<!-- AUTO-GENERATED from AGENTS.md — do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for AI Website Clone Template
alwaysApply: true
---
# 南洋迪克 Vue 3 首页复刻

## 项目目标

本仓库是 `https://www.ny-dk.com/` 首页的高保真 Vue 实现。复刻阶段必须优先匹配原站布局、文案、资源、色彩、字体、响应式行为和交互，不做主观改版。

## 技术栈

- Vue 3
- Vite
- TypeScript strict
- Vue Router
- Pinia
- Tailwind CSS 4
- Composition API 与 `<script setup lang="ts">`
- `.vue` 单文件组件

严禁引入 React、React DOM、Next.js、JSX 或 TSX。

## 命令

- `npm run dev`：Vite 开发服务器
- `npm run lint`：ESLint
- `npm run typecheck`：`vue-tsc --noEmit`
- `npm run build`：Vite 生产构建
- `npm run check`：lint + typecheck + build

## 代码规范

- TypeScript strict，禁止 `any`
- 2 空格缩进
- Vue 组件使用 PascalCase，组合式函数使用 `useXxx`
- 组件只消费 `src/data/` 中的严格类型数据
- 使用本地 `public/assets/` 资源，禁止原站图片、视频和字体热链
- 同站链接使用 Vue Router；第三方、`tel:`、`mailto:` 保持原协议
- 响应式断点和数值以 `docs/research/` 与 `docs/design-references/` 为准
- 动画必须支持 `prefers-reduced-motion`

## 目录

```text
src/
  components/
  composables/
  data/
  router/
  stores/
  types/
  views/
public/assets/
docs/research/
docs/design-references/
```

## 协作

- 并行实现时，每位构建者必须使用独立 `codex/` 分支与独立 git worktree。
- 在各工作树交付前运行 `npm run typecheck` 与 `npm run lint`。
- 主实现者逐一合并并处理冲突，最终统一运行 `npm run check` 和三档视口视觉校准。
- 不推送远程仓库。

修改本文件后运行 `bash scripts/sync-agent-rules.sh` 更新平台规则副本。

# Website Inspection Guide

## How to Reverse-Engineer Any Website

This guide outlines what to capture when inspecting a target website via Chrome MCP or browser DevTools.

## Phase 1: Visual Audit

### Screenshots to Capture
- [ ] Every distinct page — desktop, tablet, mobile
- [ ] Dark mode variants (if applicable)
- [ ] Light mode variants (if applicable)
- [ ] Key interaction states (hover, active, open menus, modals)
- [ ] Loading/skeleton states
- [ ] Empty states
- [ ] Error states

### Design Tokens to Extract
- [ ] **Colors** — background, text (primary/secondary/muted), accent, border, hover, error, success, warning
- [ ] **Typography** — font family, sizes (h1-h6, body, caption, label), weights, line heights, letter spacing
- [ ] **Spacing** — padding/margin patterns (look for a scale: 4px, 8px, 12px, 16px, 24px, 32px, etc.)
- [ ] **Border radius** — buttons, cards, avatars, inputs
- [ ] **Shadows/elevation** — card shadows, dropdown shadows, modal overlay
- [ ] **Breakpoints** — when does the layout shift? (inspect with DevTools responsive mode)
- [ ] **Icons** — which icon library? custom SVGs? sizes?
- [ ] **Avatars** — sizes, shapes, fallback behavior
- [ ] **Buttons** — all variants (primary, secondary, ghost, icon-only, danger)
- [ ] **Inputs** — text fields, textareas, selects, checkboxes, toggles

## Phase 2: Component Inventory

For each distinct UI component, document:
1. **Name** — what would you call this component?
2. **Structure** — what HTML elements / child components does it contain?
3. **Variants** — does it have different sizes, colors, or states?
4. **States** — default, hover, active, disabled, loading, error, empty
5. **Responsive behavior** — how does it change at different breakpoints?
6. **Interactions** — click, hover, focus, keyboard navigation
7. **Animations** — transitions, entrance/exit animations, micro-interactions

### Common Components to Look For
- Navigation (top bar, sidebar, bottom bar)
- Cards / list items
- Buttons and links
- Forms and inputs
- Modals and dialogs
- Dropdowns and menus
- Tabs and segmented controls
- Avatars and user badges
- Loading skeletons
- Toast notifications
- Tooltips and popovers

## Phase 3: Layout Architecture

- [ ] **Grid system** — CSS Grid? Flexbox? Fixed widths?
- [ ] **Column layout** — how many columns at each breakpoint?
- [ ] **Max-width** — main content area max-width
- [ ] **Sticky elements** — header, sidebar, floating buttons
- [ ] **Z-index layers** — navigation, modals, tooltips, overlays
- [ ] **Scroll behavior** — infinite scroll, pagination, virtual scrolling

## Phase 4: Technical Stack Analysis

- [ ] **Framework** — React? Vue? Angular? Check `__NEXT_DATA__`, `__NUXT__`, `ng-version`
- [ ] **CSS approach** — Tailwind (utility classes), CSS Modules, Styled Components, Emotion, vanilla CSS
- [ ] **State management** — Redux (check DevTools), React Query, Zustand, Pinia
- [ ] **API patterns** — REST, GraphQL (check network tab for `/graphql` requests)
- [ ] **Font loading** — Google Fonts, self-hosted, system fonts
- [ ] **Image strategy** — CDN, lazy loading, srcset, WebP/AVIF
- [ ] **Animation library** — Framer Motion, GSAP, CSS transitions only

## Phase 5: Documentation Output

After inspection, create these files in `docs/research/`:
1. `DESIGN_TOKENS.md` — All extracted colors, typography, spacing
2. `COMPONENT_INVENTORY.md` — Every component with structure notes
3. `LAYOUT_ARCHITECTURE.md` — Page layouts, grid system, responsive behavior
4. `INTERACTION_PATTERNS.md` — Animations, transitions, hover states
5. `TECH_STACK_ANALYSIS.md` — What the site uses and our chosen equivalents
