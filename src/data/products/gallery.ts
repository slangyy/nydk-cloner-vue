import type {
  ProductCarouselSlide,
  ProductPageConfig,
  ProductSectionContent,
  ProductSpaceTab,
} from "@/types/products";

const watermark = "/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png";
const finishedRoot = "/assets/products/finished";
const integratedRoot = "/assets/products/integrated";

export const finishedPage = {
  key: "finished",
  hero: {
    image: `${finishedRoot}/ccc7bda7-6e79-4174-8c6d-f2b8e814e5c5.png`,
    imageAlt: "POSEENA普西纳高定厨房空间",
    title: "POSEENA",
    subtitle: "POSEENA",
    watermark,
    aspectRatio: [1920, 1080],
    breadcrumbs: [
      {
        label: "网站首页",
        to: "/",
        showHomeIcon: true,
      },
      {
        label: "POSEENA",
        current: true,
      },
    ],
  },
} as const satisfies ProductPageConfig;

export const finishedIntroduction = {
  title: "POSEENA丨普西纳",
  subtitle: "时尚与现代、原生与传统",
  description:
    "POSEENA普西纳是一极致的生活美学，更是品牌的诗意烟火，以茶院的形式让我们实现人与环境对话，建筑与景观融合、室内与室外的链接，序列的屏风与茶桌茶柜的层次美学，真正可以做到可闲情逸致品茶可商务会谈社交。",
  english:
    "POSEENA is an ultimate aesthetic of life, and it is also the brand's poetic fireworks. In the form of a tea house, it allows us to achieve dialogue between people and the environment, integration of architecture and landscape, indoor and outdoor links, and a layered aesthetic of sequential screens and tea tables and cabinets. It can truly achieve leisurely tea tasting, business meetings, and social interaction.",
} as const satisfies ProductSectionContent;

const finishedSceneFiles = [
  "16e26f4a-dfa1-492f-a854-0213df98df94.jpg",
  "488fc65f-fc06-4edc-b18e-3c510f9e8700.jpg",
  "89e78c30-30a8-4152-9c99-38c32739e633.jpg",
  "8d8b5d5b-c1e2-4d8b-9d32-38728860d70e.jpg",
  "1c7f6c77-fa87-4fcb-bcf4-be0d7bfb86e9.jpg",
  "c2a6e713-2d06-49ea-822d-163acd81e723.jpg",
  "27f52bca-0376-41fb-9f14-6e07193ca4ce.png",
] as const;

const finishedDetailFiles = [
  "fe5763e5-37c8-4222-bf98-d4dba0b0aa02.jpg",
  "925d891b-d589-48d0-a44d-d09b0220e90f.jpg",
  "b391778e-6b39-4269-9409-2d888309cb5c.jpg",
  "4d5335d7-8169-44ef-b025-c8bbe4f33f81.jpg",
  "053e5c97-7bb9-43a7-88a9-75ee128ca0a5.jpg",
] as const;

const finishedTabMeta = [
  {
    id: "entrance",
    title: "入户空间",
    english: "ENTRANCE SPACE",
    icon: "df9416c5-b508-47f5-bb78-6ba523db126c.png",
  },
  {
    id: "reception",
    title: "会客空间",
    english: "RECEPTION SPACE",
    icon: "8b839be8-a0b8-4510-bf7a-8e8f01315cd2.png",
  },
  {
    id: "sleep",
    title: "睡眠空间",
    english: "SLEEP SPACE",
    icon: "5f2d42cc-5fb8-452d-934b-f141838dd797.png",
  },
  {
    id: "kitchen",
    title: "餐厨空间",
    english: "KITCHEN SPACE",
    icon: "d708bd09-11ac-430a-8e6c-c20e9d8c3f39.png",
  },
  {
    id: "study",
    title: "书茶空间",
    english: "STUDY SPACE",
    icon: "cd3ca4b3-6121-4a58-8a3f-e78d470fb4c7.png",
  },
  {
    id: "clothing",
    title: "衣帽空间",
    english: "CLOTHING SPACE",
    icon: "29f6a515-9d12-41ac-bd69-1c973cfa5a42.png",
  },
  {
    id: "customer-case",
    title: "客户案例",
    english: "Customer Case",
    icon: "1b2fd4a2-cc7f-4442-9d45-423055ac14c2.png",
  },
] as const;

export const finishedSpaceTabs = finishedTabMeta.map((tab, index) => {
  const scene: ProductCarouselSlide = {
    id: `${tab.id}-scene`,
    image: `${finishedRoot}/${finishedSceneFiles[index]}`,
    imageAlt: `POSEENA普西纳${tab.title}`,
    title: tab.title,
    description: tab.english,
  };
  const detailFile = finishedDetailFiles[index];
  const slides: readonly ProductCarouselSlide[] = detailFile
    ? [
        scene,
        {
          id: `${tab.id}-detail`,
          image: `${finishedRoot}/${detailFile}`,
          imageAlt: `${tab.title}产品细节`,
          title: tab.title,
          description: "产品细节",
        },
      ]
    : [scene];

  return {
    ...tab,
    icon: `${finishedRoot}/${tab.icon}`,
    slides,
  };
}) satisfies readonly ProductSpaceTab[];

export const integratedPage = {
  key: "integrated",
  hero: {
    image: `${integratedRoot}/5ade15ea-c638-464e-a03d-f3681882c95e.png`,
    imageAlt: "南洋迪克整装系统实木入户门",
    title: "Integrated System",
    subtitle: "整装系统",
    watermark,
    aspectRatio: [1920, 1080],
    breadcrumbs: [
      {
        label: "网站首页",
        to: "/",
        showHomeIcon: true,
      },
      {
        label: "门",
        current: true,
      },
    ],
  },
} as const satisfies ProductPageConfig;

export const integratedIntroduction = {
  title: "门",
  subtitle: "全屋整装，尊享定制",
  description:
    "以专业化与信息化推出实木定制尊享服务，服务涵盖材质多元化定制及各功能区域定制两大版块，为新世代打全屋尊享原创家具。",
  english:
    "We launch solid wood customized exclusive services with specialization and informatization, covering two major areas: diversified material customization and customization of various functional areas, providing original furniture for the new generation to enjoy throughout the house.",
} as const satisfies ProductSectionContent;

const integratedDetailFiles = [
  "dd7291dc-a46d-404e-b17f-e3095282746b.jpg",
  "c93574a5-7af6-4d0a-b567-4f03ecad51b8.jpg",
  "e2b25b91-49f7-4920-a5b8-f03b3fd1cb09.jpg",
  "26edba7d-9602-4dad-8d1d-822bd118f827.jpg",
  "d0453e8f-78f8-4cb4-a9de-e106031f7b36.jpg",
  "4e313556-ef6e-4915-a123-5528391581be.jpg",
  "404ed95f-36c5-47b5-b684-88e999b3668d.jpg",
  "e6603f46-30b2-4c82-95ae-53e0b2f209bf.jpg",
  "b64c19c6-e183-4939-a529-a689a6813b86.jpg",
  "31e9b946-79bc-4f36-b3b0-5dcdb8ac2e37.jpg",
  "c6263369-239a-4998-8a4b-3049d3a026ad.jpg",
  "26855b0d-3f7a-4c77-b28b-0fa2bfab263b.jpg",
  "b07c365a-7dd1-442d-a1c9-2f6680c2e558.jpg",
] as const;

export const integratedDetailSlides = integratedDetailFiles.map(
  (file, index): ProductCarouselSlide => ({
    id: `integrated-detail-${index + 1}`,
    image: `${integratedRoot}/${file}`,
    imageAlt: `南洋迪克整装系统实木门细节${index + 1}`,
  }),
);

const integratedScene = `${integratedRoot}/b93e8ca4-806c-49ae-8d49-7d63f5f23ea5.jpg`;
const integratedIcon = `${integratedRoot}/84e6d09b-f567-4a08-81b4-33c60f28df57.png`;

export const integratedSpaceTabs = [
  {
    id: "reception",
    title: "会客空间",
    english: "RECEPTION SPACE",
    icon: integratedIcon,
    slides: [
      {
        id: "integrated-reception",
        image: integratedScene,
        imageAlt: "南洋迪克整装系统会客空间",
      },
    ],
  },
  {
    id: "sleep",
    title: "睡眠空间",
    english: "SLEEP SPACE",
    icon: integratedIcon,
    slides: [
      {
        id: "integrated-sleep",
        image: integratedScene,
        imageAlt: "南洋迪克整装系统睡眠空间",
      },
    ],
  },
  {
    id: "entrance",
    title: "入户空间",
    english: "ENTRANCE SPACE",
    icon: integratedIcon,
    slides: [
      {
        id: "integrated-entrance",
        image: integratedScene,
        imageAlt: "南洋迪克整装系统入户空间",
      },
    ],
  },
] as const satisfies readonly ProductSpaceTab[];

