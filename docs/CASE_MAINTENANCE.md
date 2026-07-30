# 案例内容维护指南

案例页和首页底部案例区共用 `src/data/cases.ts` 中的 `caseStudies` 数组。只要修改这一处，两个页面会同时更新。

## 添加图片

1. 在 `public/assets/cases/` 下新建以案例 ID 命名的目录，例如：

   ```text
   public/assets/cases/my-new-case/
     cover.jpg
     living-room.jpg
     dining-room.jpg
     bedroom.jpg
   ```

2. 图片路径从 `/assets/cases/` 开始，不需要写 `public`：

   ```ts
   src: "/assets/cases/my-new-case/cover.jpg"
   ```

3. 建议封面宽度不低于 1600px，图集图片不低于 1400px。优先使用压缩后的 JPG 或 WebP，避免单张图片过大。

## 添加案例

在 `caseStudies` 数组中复制一条案例并修改：

```ts
{
  id: "my-new-case",
  title: "案例标题",
  summary: "案例简介。",
  location: "项目地点",
  series: "产品系列",
  tags: ["会客空间", "现代东方"],
  posterRatio: "landscape",
  cover: {
    src: "/assets/cases/my-new-case/cover.jpg",
    alt: "案例封面说明",
  },
  gallery: [
    {
      src: "/assets/cases/my-new-case/living-room.jpg",
      alt: "客厅空间",
      caption: "会客空间",
    },
    {
      src: "/assets/cases/my-new-case/dining-room.jpg",
      alt: "餐厅空间",
      caption: "餐厨空间",
    },
  ],
},
```

- `id`：必须唯一，只使用小写英文、数字和短横线。
- `posterRatio`：`landscape` 为横版封面，`portrait` 为竖版封面。
- `location`、`series` 和图片 `caption` 可以删除；页面不会保留空白。
- `gallery` 只填写封面以外的图片。弹层会自动把 `cover` 作为第一张。
- 数组中的排列顺序，就是首页轮播和案例海报墙的展示顺序。
- 删除案例时，先删除数组中的对象，再删除不再使用的图片目录。

## 检查修改

保存代码后在项目根目录运行：

```bash
npm run check
```

确认命令通过后，再分别查看桌面端和手机端的封面裁切、图片顺序与文字内容。
