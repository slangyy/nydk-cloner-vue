# IntegratedVariantTabs Specification

## Overview

- Target: `src/components/products/IntegratedVariantTabs.vue`
- Interaction model: Vue Router 导航。
- 三个状态共享 DOM 与图片，仅当前路由决定选中状态。

## DOM Structure

- 全宽白色 `nav`。
- 内部列表宽 `80%`，最大 `1440px`，桌面水平居中。
- 每个标签宽列表的 `20%`，通过精灵图上、下半区显示选中和默认状态。

## Computed Styles

- 桌面列表：`display:flex; justify-content:center; width:80%; max-width:1440px`。
- 标签：`width:20%; padding-top:7.4%; position:relative; overflow:hidden`。
- 图片：绝对定位，宽 `100%`，高度保持 `4 / 3`。
- 默认态：图片 `bottom:0`，显示精灵图下半部白底文字状态。
- 选中态：图片 `top:0`，显示精灵图上半部实景状态。
- 状态切换：`top/bottom 0.3s`。
- 相邻默认标签之间使用 `#ddd` 的 `1px` 竖分隔线；选中标签不显示分隔线。

## Responsive

- `≤998px`：列表允许换行；每项宽 `50%`、`padding-top:18.7%`，第三项进入第二行。
- 移动端保持精灵图切换方式，不用文字按钮替代。

## Assets

- 门：`/assets/products/integrated/32a77d50-f4d2-46f4-a382-06a8080b6485.jpg`
- 墙：`/assets/products/integrated/d3a4d384-4c2f-4bc1-b9c9-867c3460c56c.jpg`
- 柜：`/assets/products/integrated/1953e757-2377-4c58-8731-0be58f4a83ea.jpg`
