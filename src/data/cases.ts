import type { CaseStudy, InnerPageHeroConfig } from "@/types/content";

const image = (filename: string): string => `/assets/images/${filename}`;

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "poseena-source-house",
    title: "普西纳·源邸一号",
    summary:
      "以全案系统思维打破单品堆砌的桎梏，用高级定制回应多元生活场景，怀全球视野与理想生活重逢，与您共赴美学新境界。",
    location: "西安·源邸一号",
    series: "POSEENA系列",
    tags: ["入户空间", "会客空间"],
    posterRatio: "landscape",
    cover: {
      src: image("7e96edc9-790a-4e60-9949-79259ec934eb.png"),
      alt: "普西纳源邸一号全案空间",
    },
    gallery: [
      {
        src: image("f281fbf9-7130-48bf-879a-a1ea5773eba7.jpg"),
        alt: "普西纳源邸一号入户空间",
        caption: "入户空间",
      },
      {
        src: image("f4bbb759-e522-4d10-bb9e-ff4fb4ca6afc.jpg"),
        alt: "普西纳源邸一号会客空间",
        caption: "会客空间",
      },
      {
        src: image("3d136554-13fe-4115-ae0f-489a4accee22.jpg"),
        alt: "普西纳源邸一号餐厨空间",
        caption: "餐厨空间",
      },
      {
        src: image("a8ec183b-0dfc-48d5-ad20-b50711b14083.jpg"),
        alt: "普西纳源邸一号书茶空间",
        caption: "书茶空间",
      },
    ],
  },
  {
    id: "jieyang-villa",
    title: "广东揭阳·别墅会所",
    summary:
      "“宅中有园，园中有屋，屋中有院，院中有树”是林语堂笔下对理想庭院的诗意描述。一步一景，层层嵌套，自然与生活的界限在此悄然消融。",
    location: "广东揭阳",
    series: "领见生活",
    tags: ["别墅会所", "东方美学"],
    posterRatio: "portrait",
    cover: {
      src: image("02070298-fcc8-48dc-a40c-c3f0e8c53f4d.jpg"),
      alt: "广东揭阳别墅会所",
    },
    gallery: [
      {
        src: image("71c4fbe8-3d35-4446-9ea3-a1f7b20ef437.jpg"),
        alt: "广东揭阳别墅会所睡眠空间",
        caption: "睡眠空间",
      },
      {
        src: image("c2a6e713-2d06-49ea-822d-163acd81e723.jpg"),
        alt: "广东揭阳别墅会所衣帽空间",
        caption: "衣帽空间",
      },
      {
        src: image("534f87e0-f8cd-41e5-9b95-7caa1ac40c4d.jpg"),
        alt: "广东揭阳别墅会所陈设细节",
        caption: "空间陈设",
      },
    ],
  },
  {
    id: "skyline",
    title: "天际 · 山水名著",
    summary:
      "以雅木为基，辅以极简设计，融现代简约与东方美学，打造兼具年轻审美与国际时尚氛围的居住空间。",
    location: "山水名著",
    series: "天际系列",
    tags: ["会客空间", "餐厨空间"],
    posterRatio: "landscape",
    cover: {
      src: image("deab19e6-4a1c-42b7-afed-dc1eacd01e68.jpg"),
      alt: "天际山水名著客厅空间",
    },
    gallery: [
      {
        src: image("9befa60c-35e0-425c-84b1-f1c669a55ba9.jpg"),
        alt: "天际山水名著会客空间",
        caption: "会客空间",
      },
      {
        src: image("3303a17f-a199-4732-8e05-3bef2a165e69.jpg"),
        alt: "天际山水名著智能空间",
        caption: "智能空间",
      },
      {
        src: image("83e32388-b530-4cfc-9064-23cedc3c7f99.jpg"),
        alt: "天际山水名著整装空间",
        caption: "整装空间",
      },
    ],
  },
  {
    id: "yu-lin",
    title: "禾气 · 榆林一号院",
    summary:
      "化繁为简，而后由简生趣，以时尚、艺术与现代手法编织家居体验，为空间增添玻璃、灯光和金属等当代元素。",
    location: "榆林·一号院",
    series: "禾气系列",
    tags: ["现代东方", "全案空间"],
    posterRatio: "portrait",
    cover: {
      src: image("05e06fec-e017-42ee-8cb7-76e38337633b.jpg"),
      alt: "禾气榆林一号院全案空间",
    },
    gallery: [
      {
        src: image("8a53fda8-4a3b-443f-b96c-333d5a7f0f2c.jpg"),
        alt: "禾气榆林一号院材料细节",
        caption: "材料细节",
      },
      {
        src: image("faebc217-5f08-4a65-87a8-95820680f78d.jpg"),
        alt: "禾气榆林一号院工艺细节",
        caption: "工艺细节",
      },
      {
        src: image("9f70d279-14a6-4a6f-9067-30e93fd1b5d1.jpg"),
        alt: "禾气榆林一号院生活场景",
        caption: "生活场景",
      },
    ],
  },
  {
    id: "high-tech",
    title: "禾气 · 高新融府",
    summary:
      "以简练的空间秩序承载丰富生活，在温润木色中融入现代材质，让日常居所兼具舒适尺度与轻盈气质。",
    location: "西安·高新融府",
    series: "禾气系列",
    tags: ["现代简约", "精装住宅"],
    posterRatio: "landscape",
    cover: {
      src: image("ca80a867-98e9-4392-937b-31866e6224bc.jpg"),
      alt: "禾气高新融府全案空间",
    },
    gallery: [
      {
        src: image("93ec5ad0-fb99-47d3-a0cf-c132be4d08f6.jpg"),
        alt: "禾气高新融府设计空间",
        caption: "设计空间",
      },
      {
        src: image("1aa132c4-de87-476a-b0c2-f66d9b68c8fa.jpg"),
        alt: "禾气高新融府客餐厅",
        caption: "客餐厅",
      },
      {
        src: image("1682dc8e-eb38-47e8-94ab-5a7e3cbd6bf4.jpg"),
        alt: "禾气高新融府空间细节",
        caption: "空间细节",
      },
      {
        src: image("4dbea946-5c74-4478-b283-282d362300ab.jpg"),
        alt: "禾气高新融府材料应用",
        caption: "材料应用",
      },
    ],
  },

  
] as const;

export const casesHero: InnerPageHeroConfig = {
  image: caseStudies[0]!.cover.src,
  imageAlt: "南洋迪克全案家居案例",
  title: "CASE",
  subtitle: "案例",
  watermark: "/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png",
  breadcrumbs: [
    {
      label: "网站首页",
      to: "/",
      showHomeIcon: true,
    },
    {
      label: "案例",
      current: true,
    },
  ],
  aspectRatio: [1920, 1080],
} as const;
