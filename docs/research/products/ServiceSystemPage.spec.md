# 服务系统页面规格

## 页面结构

- 原站路径：`https://www.ny-dk.com/SaveWorry.html?p=7`
- 本地路径：`/SaveWorry.html?p=7`
- Hero：`SERVICE SYSTEM / 服务系统`。
- 正文依次为“服务流程”和“服务力”，继续使用现有 Header、Footer 与
  `ProductPageShell`。

## 服务流程

- 组件规格见
  `docs/research/components/ServiceProcessSection.spec.md`。
- 深色空间图作为全宽背景，中央是 `SERVICE / 服务流程` 标题和加号。
- 桌面端七个节点沿 740 × 740px 椭圆轨道排布。
- 默认每 3000ms 轮换激活节点；悬停或键盘聚焦某项时暂停并显示对应图片。

## 服务力

- 组件规格见
  `docs/research/components/ServicePowerCarousel.spec.md`。
- 三项内容使用居中循环轮播，自动向左播放。
- 桌面中央显示约 1.6 张，左右相邻卡片露出并覆盖深色遮罩。
- 只有当前卡显示标题、说明和圆形心形图标。

## 响应式与动效

- `≤998px` 时服务流程改为纵向列表，轨道图隐藏。
- `≤768px` 时服务力轮播显示约 1.1 张，间距缩至 10px。
- 进入视口时使用现有 `ProductReveal` 向上淡入。
- `prefers-reduced-motion` 下停止自动切换并取消过渡。
