# IntegratedFullBleedCarousel Specification

## Overview

- Target: `src/components/products/IntegratedFullBleedCarousel.vue`
- Interaction model: 时间驱动自动播放 + 左右按钮 + 触摸滑动。
- 图片按原始 `3779 × 2125` 比例全宽展示，不增加页面级左右内边距。

## Computed Styles

- 轮播容器：`width:100%; overflow:hidden; position:relative`。
- 幻灯片：`width:100%`。
- 图片：`display:block; width:100%; height:auto`。
- 桌面按钮：`50px × 50px`，圆形，背景 `rgb(188 148 128 / 60%)`。
- 上一张距左 `35px`；下一张距右 `35px`。
- 箭头：白色，约 `22px`。
- `≤998px`：按钮 `30px × 30px`，左右各 `10px`，箭头约 `14px`。

## Behavior

- 原站使用 Swiper `autoplay:true`；本地实现使用 `3000ms` 默认间隔。
- 本地开启循环，避免门 / 墙 / 柜长图集播放到末尾后出现空白或无法继续切换。
- 切换速度约 `800ms`，支持 `prefers-reduced-motion`：减少动态效果时关闭自动播放并缩短切换。

## Content

- 门：13 张。
- 墙：37 张。
- 柜：24 张。
- 不显示标题、说明或缩略图，不追加原站中未显示的隐藏备用图库。
