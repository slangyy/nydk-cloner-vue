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

@docs/research/INSPECTION_GUIDE.md
