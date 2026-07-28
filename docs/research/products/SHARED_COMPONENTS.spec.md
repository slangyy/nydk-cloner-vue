# 产品页共享组件规格

## ProductPageShell

- 目标：统一组合现有 Header、`InnerPageHero`、正文插槽和现有 Footer。
- 页面宽度：`100%`；横向溢出隐藏；背景默认白色。
- Header 由路由 `meta.headerOverlay = true` 控制，不在组件内复制逻辑。

## ProductSectionHeading

- 英文标题：Bank 字体优先，桌面 `34-48px`，字距 `0.08em`。
- 中文标题：桌面 `28-36px`，移动端 `22-26px`。
- 装饰线：宽 `60-80px`、高 `2px`、玫瑰棕 `#c89b86`。

## ProductMediaCarousel

- 使用 Swiper Vue；图片 `object-fit: cover`。
- 前后按钮为透明圆形描边，直径约 `48px`，移动端约 `38px`。
- 按钮始终连接同一 Swiper 实例；循环模式不得产生空白幻灯片。

## ProductSpaceGallery

- 标签与当前内容使用严格类型数据同步。
- 切换动画约 `0.6s` 淡入；无自动切换。
- 桌面标签横向排列，移动端横向滚动。
- 图片查看层覆盖视口，黑色半透明背景，支持关闭按钮、Esc 和遮罩关闭。

