# 南洋迪克首页页面拓扑

采集日期：2026-07-27  
目标：https://www.ny-dk.com/

## 页面顺序

1. `SiteHeader`：固定在视口顶部，首页首屏为透明白字状态。
2. `HeroSection`：桌面端占满一屏，移动/平板端固定约 200px 高。
3. `HomeSystemsSection`：家装系统标题及系统卡片矩阵。
4. `SpaceShowcase`：六个空间的主图与缩略导航。
5. `DesignInstituteSection`：设计师拼贴矩阵。
6. `CasesShowcase`：五个案例的主图、说明和缩略导航。
7. `NewsSection`：四条新闻卡片。
8. `SiteFooter`：品牌、社交入口、二维码、导航和联系信息。

## 桌面端几何基线（1440 × 900 CSS 像素）

- Hero：top 0，height 900。
- 家装系统：top 900，height 1234。
- 空间展示：top 2134，height 804。
- 设计研究院：top 2938，height 893。
- 案例：top 3830，height 804。
- 新闻：top 4634，height 918。
- 页脚：top 5552，height 534。
- 页面内容宽度约 1435px，主要内容容器宽度为视口的 88%。

## 移动端几何基线（390 × 844 CSS 像素）

- Hero：top 0，height 200。
- 家装系统：top 200，height 663。
- 空间展示：top 863，height 318。
- 设计研究院：top 1181，height 511。
- 案例：top 1692，height 443。
- 新闻：top 2135，height 764。
- 页脚：top 2899，height 590。

## 层级与依赖

- Header 使用 `position: fixed` 和 `z-index: 1000`，覆盖 Hero 和所有内容。
- Hero 使用视频作为真实媒体层，标题导航直接叠加其上。
- Space 与 Cases 的主图层全部绝对叠放，以 active 状态控制透明度和层级。
- 所有浅色标题区复用相同的淡色 N 水印、Bank 英文字体和暖棕色短横线。
- 移动菜单展开后占据 header 以下整个视口，并锁定页面滚动。

## 交互模型

- Header：滚动方向驱动，桌面 hover 下拉，移动 click 折叠。
- Hero：时间驱动的视频循环。
- Home Systems：桌面 hover，移动 click。
- Space Showcase：桌面 hover，移动 click。
- Design Institute：静态布局，卡片 hover。
- Cases Showcase：click 驱动。
- News：静态列表，卡片 hover。
- Reveal：IntersectionObserver 驱动的进入视口淡入。
