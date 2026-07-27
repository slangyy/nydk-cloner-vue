# 南洋迪克首页 Vue 3 复刻

基于 2026-07-27 的 [南洋迪克官网](https://www.ny-dk.com/) 首页制作的高保真实现。当前范围为首页；同站内页路径由 Vue Router 统一进入品牌化占位页。

## 技术栈

- Vue 3 + Composition API + `<script setup lang="ts">`
- Vite + TypeScript strict
- Vue Router + Pinia
- Tailwind CSS 4
- Swiper Vue（仅用于缩略轨道）
- Nginx（生产镜像与 history fallback）

项目不包含 React、React DOM、Next.js、JSX 或 TSX。

## 本地运行

```bash
npm install
npm run dev
```

Vite 默认运行在 `http://localhost:5173`。

更完整的目录说明、交互定位、响应式校准和常见故障处理见
[`docs/DEVELOPMENT_GUIDE.md`](docs/DEVELOPMENT_GUIDE.md)。

## 质量检查

```bash
npm run lint
npm run typecheck
npm run build
npm run check
```

`npm run typecheck` 固定执行 `vue-tsc --noEmit`。

## Docker

生产镜像由 Node 构建 `dist`，再交给 Nginx 托管：

```bash
docker compose up app --build
```

默认访问 `http://localhost:3000`。Nginx 的 `try_files` 已配置 Vue Router history fallback。

开发容器运行 Vite：

```bash
docker compose up dev --build
```

默认访问 `http://localhost:5173`。

## 项目结构

```text
src/
  components/       首页与站点组件
  composables/      进入视口等组合式逻辑
  data/             严格类型的真实首页内容
  router/           首页与统一占位路由
  stores/           Pinia 全局 UI 状态
  types/            页面内容接口
  views/            路由视图
public/assets/       已去重的本地图片、视频、字体和 SVG
docs/research/       页面拓扑、设计令牌、交互与组件规格
docs/design-references/  原站多视口参考截图
```

## 资源与版权

本项目用于对既有站点进行技术迁移与视觉验证。原站品牌、文案、图片和视频的权利归原权利人所有。
