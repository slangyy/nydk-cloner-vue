# 整装系统门 / 墙 / 柜页面规格

## 页面拓扑

- 三个同构页面：
  - `/FixedInstallation_1.html`：门。
  - `/FixedInstallation_2.html`：墙。
  - `/FixedInstallation_3.html`：柜。
- 页面顺序固定为：通用内页 Hero → 门墙柜切换条 → 纹理介绍区 → 全宽图片轮播 → 现有 Footer。
- 不存在此前实现的“空间标签图库”；该区块必须移除。
- 三个路径复用同一个 Vue 页面组件，仅由严格类型数据切换 Hero、当前标签、标题和轮播图片。

## Hero

- 比例：桌面 `1920 / 1080`，移动端沿用 `InnerPageHero` 的约 `300px` 高度。
- 门：
  - 图片：`5ade15ea-c638-464e-a03d-f3681882c95e.png`。
  - 标题：`Integrated System / 整装系统`。
- 墙：
  - 图片：`wall/47969cad-e928-46e2-8509-f1f405f14278.png`。
  - 标题：`Customeized System / 固装系统`，保留原站拼写。
- 柜：
  - 图片：`cabinet/12fff885-b586-4936-89d0-f124e0297a61.png`。
  - 标题：`Customeized System / 固装系统`，保留原站拼写。
- 面包屑首页可返回 `/`，当前页分别显示“门”“墙”“柜”。

## 切换条

- 规格见 `docs/research/components/IntegratedVariantTabs.spec.md`。
- 使用三个原站 `320 × 240` 的上下双状态精灵图。
- 路由切换时重新挂载页面，使 Hero 进场状态和轮播索引复位。

## 介绍区

- 背景：`a9ecc882-266c-4463-9b0f-9fae0e0c8f5f.jpg`，`cover`。
- 桌面上下内边距 `120px`；`≤1366px` 为 `60px`。
- 主标题：门 / 墙 / 柜，`48px`、`500`、居中。
- 副标题：`全屋整装，尊享定制`；墙页原站使用顿号 `全屋整装、尊享定制`。
- 副标题桌面 `36px`、字距 `0.5em`，下方 `120px × 2px` 玫瑰棕分隔线。
- 中文正文：`18px`、`#777`、宽 `62.5%`、行高 `3`。
- 英文正文：`16px`、`#ccc`、宽 `62.5%`、行高 `3`、上边距 `20px`。
- `≤1366px` 正文行高降为 `2`；`≤998px` 正文宽 `90%`，副标题字距 `0.1em`。

## 全宽轮播

- 规格见 `docs/research/components/IntegratedFullBleedCarousel.spec.md`。
- 门 13 张、墙 37 张、柜 24 张，全部使用原站 `3779 × 2125` 图片。
- 页面结束后直接进入现有 Footer。

## 参考截图

- `docs/design-references/original-integrated-door-tabs-intro.png`
- `docs/design-references/original-integrated-door-carousel.png`
- `docs/design-references/original-integrated-wall-tabs-intro.png`
