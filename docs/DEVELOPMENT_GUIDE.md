# 南洋迪克首页开发与调试手册

最后更新：2026-07-28

本文面向需要继续开发、调试和视觉校准本项目的开发者。项目当前只高保真实现首页，其他同站路径由 Vue Router 统一展示占位页。

## 1. 环境要求

- Node.js `20.19` 或更高版本
- npm
- 推荐使用 Chrome 或 Edge 调试响应式页面
- 可选：Docker Desktop，用于验证生产镜像和 Nginx history fallback

检查环境：

```powershell
node --version
npm --version
```

如果 PowerShell 阻止执行 `npm.ps1`，可使用：

```powershell
npm.cmd --version
```

## 2. 快速启动

首次运行推荐使用锁文件安装依赖：

```powershell
cd D:\project\nydk-cloner-vue
npm ci
npm run dev
```

打开：

```text
http://localhost:5173
```

开发服务器应在当前终端前台运行，停止时按 `Ctrl+C`。不要使用 `start /b` 启动 Vite，否则 Windows 下可能让终端会话一直等待。

如果需要指定端口：

```powershell
npm run dev -- --port 5174
```

### 当前工作区提示

当前未提交代码中有两个临时显示开关：

- `HeroSection.vue` 中的 `.hero-section__copy` 已被注释，首屏不显示叠加文案。
- `HomeView.vue` 中的 `<NewsSection />` 已被注释，首页不渲染新闻区块。

本文没有修改这两处代码。需要恢复完整首页时，取消对应模板注释；如果继续隐藏新闻区块，应同时移除未使用的 `NewsSection` import，避免严格类型检查报告未使用导入。

## 3. 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器和热更新 |
| `npm run lint` | 检查 Vue、TypeScript 和代码风格 |
| `npm run typecheck` | 执行 `vue-tsc --noEmit` 严格类型检查 |
| `npm run build` | 生成生产目录 `dist/` |
| `npm run preview` | 本地预览 `dist/` |
| `npm run check` | 依次执行 ESLint、类型检查和生产构建 |

修改代码后，至少执行：

```powershell
npm run typecheck
npm run lint
```

准备交付前执行：

```powershell
npm run check
```

## 4. 技术架构

页面启动链路：

```text
index.html
  └─ src/main.ts
      ├─ 创建 Vue 应用
      ├─ 注册 Pinia
      ├─ 注册 Vue Router
      └─ 挂载 src/App.vue
          └─ <RouterView />
              ├─ /                  → HomeView.vue
              └─ 任意其他内部路径   → PlaceholderView.vue
```

核心目录：

```text
src/
  components/       首页区块和站点公共组件
  composables/      可复用的组合式逻辑
  data/             首页真实文案、链接和资源路径
  router/           路由及路由切换行为
  stores/           Pinia 全局 UI 状态
  types/            内容数据的严格类型
  views/            路由级页面
  styles.css        全局样式、设计变量和动效基础
public/assets/       本地图片、背景、视频、字体和 SVG
docs/research/       原站勘察、设计令牌和组件规格
docs/design-references/  原站与本地多视口截图
```

## 5. 首页组件定位

首页装配入口为 [`src/views/HomeView.vue`](../src/views/HomeView.vue)。

| 页面区域 | 文件 | 主要调试点 |
| --- | --- | --- |
| 顶部导航 | `src/components/SiteHeader.vue` | 滚动隐藏、固色、移动菜单和折叠组 |
| 视频首屏 | `src/components/HeroSection.vue` | MP4、封面、首屏高度、移动端裁切和当前已注释的叠加文案 |
| 家装系统 | `src/components/HomeSystemsSection.vue` | 3×3/2×4 网格、悬停或点击展开 |
| 空间展示 | `src/components/SpaceShowcase.vue` | 主图切换、Swiper 缩略轨道 |
| 设计研究院 | `src/components/DesignInstituteSection.vue` | 人物拼贴和图片缩放 |
| 案例展示 | `src/components/CasesShowcase.vue` | 图文同步、Swiper 缩略轨道和按钮 |
| 新闻动态 | `src/components/NewsSection.vue` | 四列/双列布局、文本截断；当前在 `HomeView.vue` 中暂停渲染 |
| 页脚 | `src/components/SiteFooter.vue` | 导航、联系方式、二维码和移动布局 |
| 通用标题 | `src/components/SectionTitle.vue` | 中英文标题间距和字体 |
| 占位页 | `src/views/PlaceholderView.vue` | 内部路径名称和返回首页 |

对应的原站规格位于 [`docs/research/components/`](research/components/)。

## 6. 内容和资源如何修改

### 6.1 修改文案、图片和链接

优先编辑：

```text
src/data/home.ts
```

该文件包含：

- 主导航和下拉菜单
- 8 个家装系统
- 6 个空间状态
- 设计师图片
- 5 个案例
- 4 条新闻
- 页脚联系方式
- 视频和封面路径
- 内部占位页名称

内容结构由 [`src/types/content.ts`](../src/types/content.ts) 约束。不要使用 `any`，新增字段时应先更新对应接口。

### 6.2 内部与外部链接

- 内部链接使用以 `/` 开头的站内路径，由 `RouterLink` 处理。
- 外部链接的数据项需要设置 `external: true`。
- 电话使用 `tel:`。
- 邮件使用 `mailto:`。
- 未实现的内部路径会被通配路由交给 `PlaceholderView.vue`。

如果新增已知占位页名称，同时更新：

```ts
// src/data/home.ts
export const pageNames = {
  "/new-page.html": "新页面名称",
};
```

带查询参数的页面可以使用完整键：

```ts
"/about.html?p=0": "品牌介绍"
```

### 6.3 添加本地资源

资源应放在：

```text
public/assets/images/
public/assets/backgrounds/
public/assets/video/
public/assets/fonts/
public/assets/svg/
```

代码中的访问路径从 `/assets/` 开始：

```ts
const image = "/assets/images/example.jpg";
```

不要写成：

```ts
const image = "public/assets/images/example.jpg";
```

调试资源时打开浏览器 DevTools 的 Network 面板，筛选 `Img`、`Media` 或 `Font`，确认请求状态为 `200`，且请求目标为当前本地站点。

## 7. 路由调试

路由配置位于：

```text
src/router/index.ts
```

当前规则：

- `/`：首页。
- `/:pathMatch(.*)*`：统一占位页。
- 每次路由切换后关闭移动菜单。
- 路由切换后滚动到页面顶部。

建议直接访问以下地址验证 history 行为：

```text
http://localhost:5173/
http://localhost:5173/about.html?p=0
http://localhost:5173/design.html?p=0
http://localhost:5173/unknown-page.html
```

在 Vite 开发模式下直接访问内部路径应正常。生产环境若刷新后出现 Nginx `404`，检查 [`nginx.conf`](../nginx.conf) 是否仍包含：

```nginx
try_files $uri $uri/ /index.html;
```

## 8. Pinia 状态调试

全局 UI store 位于：

```text
src/stores/ui.ts
```

状态含义：

| 状态 | 含义 |
| --- | --- |
| `isMobileMenuOpen` | 移动菜单是否打开 |
| `openMobileGroup` | 当前展开的产品或关于分组 |
| `isHeaderHidden` | 导航是否因向下滚动而隐藏 |
| `isHeaderSolid` | 导航是否使用浅灰固色背景 |
| `isBodyLocked` | 移动菜单打开时是否锁定页面滚动 |

空间展示和案例轮播的当前项属于组件局部状态，不存入 Pinia。

推荐安装 Vue Devtools，在 Components 面板查看组件响应式状态，在 Pinia 面板查看全局导航状态。

如果关闭菜单后页面仍无法滚动：

1. 检查 `<body>` 是否残留 `menu-open` 类。
2. 检查 `isMobileMenuOpen` 是否为 `false`。
3. 检查 `SiteHeader.vue` 的 `watch` 和卸载清理逻辑。

## 9. 样式和响应式规则

全局设计变量位于 [`src/styles.css`](../src/styles.css)：

```css
--nydk-ink: #231815;
--nydk-brown: #3c312f;
--nydk-walnut: #634f44;
--nydk-rosewood: #bc9480;
--nydk-soft-gray: #eeeeee;
--nydk-border: #d3d1d0;
--nydk-container: min(88vw, 1264px);
```

关键规则：

- 组件样式主要写在各 `.vue` 文件的 `<style scoped>` 中。
- `998px` 是桌面导航、首屏高度和主要网格切换的核心断点。
- `520px`、`420px` 用于部分手机细节。
- `.bank` 使用本地 Bank 字体。
- `.page-container` 控制通用内容宽度。
- `.reveal` 与 `.is-visible` 控制进入视口动画。

视觉调试时不要先改全局变量。先确认差异来自单个组件还是所有区块，再决定修改 scoped CSS 或全局令牌。

## 10. 交互调试清单

### 10.1 顶部导航

首页导航预期状态：

1. 页面顶部：透明。
2. 向下滚动超过约 `90px`：导航隐藏。
3. 向上滚动：导航显示并变为浅灰背景。
4. 返回顶部 `8px` 以内：恢复透明。
5. 内页占位页：始终使用固色导航。

移动端验证：

- 宽度小于或等于 `998px` 时出现汉堡按钮。
- 打开菜单后 `<body>` 添加 `menu-open`。
- 产品和关于分组可以独立展开。
- 按 `Escape` 关闭菜单。
- 路由切换自动关闭菜单。

### 10.2 视频首屏

- 桌面高度为 `100vh`，并有最小高度。
- 移动端高度约 `200px`。
- 视频必须包含 `autoplay`、`muted`、`loop` 和 `playsinline`。
- 启用 `prefers-reduced-motion` 时视频暂停并显示本地封面。

为截图固定视频帧，可在 DevTools Console 执行：

```js
const video = document.querySelector("video");
video.pause();
video.currentTime = 2;
```

### 10.3 家装系统

- 桌面：鼠标悬停或键盘聚焦后，详情层扩展为两卡宽。
- 移动端：首击基础卡片只展开，不应立即进入内页。
- 点击展开后的详情层可进入占位页。
- 点击卡片外部或按 `Escape` 关闭展开状态。

如果移动端首次点击直接跳转，检查基础节点在紧凑模式下是否渲染为 `button`，而不是 `RouterLink`。

### 10.4 空间和案例

- 空间共 6 项，主图和选中缩略项必须同步。
- 案例共 5 项，主图、标题、说明和选中缩略图必须同步。
- 案例没有自动播放。
- Swiper 只负责缩略轨道和前后控制，主图状态保留在 Vue 组件中。

Swiper 不显示时检查：

```ts
import "swiper/css";
```

并确认 `swiperInstance` 已在 `@swiper` 回调中赋值。

### 10.5 进入视口动画

实现位于：

```text
src/composables/useReveal.ts
```

触发参数：

```text
threshold: 0.12
rootMargin: 0px 0px -6% 0px
```

区块空白但 DOM 已存在时，检查：

1. 元素是否有 `.reveal`。
2. 进入视口后是否添加 `.is-visible`。
3. `target` ref 是否绑定到真实 `HTMLElement`。
4. 浏览器是否启用了 reduced motion。

临时排查时，可在 Elements 面板手动添加 `is-visible`，确认问题来自观察器还是布局样式。

## 11. 多视口视觉校准

基准视口：

| 类型 | 宽度 | 高度 |
| --- | ---: | ---: |
| 桌面 | 1440 | 900 |
| 平板 | 768 | 900 |
| 手机 | 390 | 844 |

在 Chrome/Edge DevTools 中：

1. 打开 Device Toolbar。
2. 选择 Responsive。
3. 输入基准宽高。
4. 将页面缩放保持为 `100%`。
5. 从顶部重新加载页面。
6. 按区块与 `docs/design-references/` 中的截图比较。

推荐比较顺序：

1. 区块起点和总高度。
2. 内容容器宽度。
3. 图片裁切和焦点。
4. 标题字号、字距和行高。
5. 控件位置。
6. 动画持续时间和选中状态。

原站参考文件以 `nydk-` 开头，本地最终截图以 `nydk-local-` 开头。

设计令牌和计算样式记录见：

- [`docs/research/DESIGN_TOKENS.md`](research/DESIGN_TOKENS.md)
- [`docs/research/BEHAVIORS.md`](research/BEHAVIORS.md)
- [`docs/research/PAGE_TOPOLOGY.md`](research/PAGE_TOPOLOGY.md)

## 12. 常见问题

### 12.1 `npm run dev` 启动失败

先确认 Node 版本：

```powershell
node --version
```

清理并按锁文件重装：

```powershell
Remove-Item -LiteralPath node_modules -Recurse -Force
npm ci
```

删除 `node_modules` 前确认当前目录确实是本项目根目录。

### 12.2 端口已占用

直接换端口通常最快：

```powershell
npm run dev -- --port 5174
```

如需结束旧服务，先在启动它的终端按 `Ctrl+C`。不要无差别结束所有 Node 进程。

### 12.3 页面白屏

检查顺序：

1. 浏览器 Console 是否有运行时错误。
2. `src/main.ts` 是否仍注册 Pinia 和 Router。
3. `src/App.vue` 是否包含 `<RouterView />`。
4. Network 中入口 JS 是否为 `200`。
5. 运行 `npm run typecheck`。

### 12.4 图片或字体 404

- 文件必须位于 `public/assets/`。
- 路径必须以 `/assets/` 开头。
- 注意 Windows 文件名大小写问题在 Linux/Nginx 中会变成严格区分大小写。
- 构建后检查 `dist/assets` 和被复制的公共资源。

### 12.5 视频不自动播放

- 确认视频为 `muted`。
- 确认资源请求为 `200`。
- 确认响应类型支持 MP4。
- 检查是否启用了 reduced motion。
- 检查浏览器节能或自动播放策略。

### 12.6 修改后没有热更新

1. 确认编辑的是当前仓库文件。
2. 查看运行 Vite 的终端是否有编译错误。
3. 手动刷新页面。
4. 仍无效时用 `Ctrl+C` 停止，再重新运行 `npm run dev`。

### 12.7 生产内页刷新 404

这不是 Vue Router 本身的问题，通常是服务器没有 history fallback。使用本项目的 Nginx 配置，或让其他服务器把未知路径回退到 `index.html`。

## 13. Docker 调试

生产镜像：

```powershell
docker compose up app --build
```

访问：

```text
http://localhost:3000
```

指定其他端口：

```powershell
$env:PORT = "8080"
docker compose up app --build
```

开发容器：

```powershell
docker compose up dev --build
```

停止容器：

```powershell
docker compose down
```

生产容器验证重点：

- `/` 正常。
- `/about.html?p=0` 直接访问和刷新正常。
- `/assets/` 返回本地资源。
- 页面没有请求原站图片、视频或字体。

## 14. 提交前检查

执行：

```powershell
npm run check
```

再确认：

```powershell
rg --files src | Select-String -Pattern "\.(jsx|tsx)$"
```

正常情况下不应输出 JSX 或 TSX 文件。

资源热链检查：

```powershell
rg "ny-dk\.com|omo-oss-" src public -g "!public/assets/manifest.json"
```

除研究清单或明确的外部跳转语义外，运行代码中不应引用原站静态资源。

最后手工验证：

- 首页三档视口布局。
- 导航滚动状态。
- 移动菜单和折叠组。
- 家装系统展开与关闭。
- 空间和案例切换。
- 内部占位路由。
- 外部链接、电话和邮箱。
- reduced motion 模式。

## 15. 推荐调试顺序

遇到问题时按以下顺序处理，通常能最快定位：

1. 先确认 URL、视口和复现步骤。
2. 在 Console 和 Network 中排除运行时错误与资源 404。
3. 在 `src/data/home.ts` 检查内容和链接。
4. 在对应 `.vue` 文件检查局部状态和模板。
5. 检查 scoped CSS、断点和选择器优先级。
6. 检查 Pinia 或路由是否参与。
7. 运行 `npm run typecheck` 和 `npm run lint`。
8. 与对应参考截图和组件规格逐项比较。
