import type { InnerPageHeroConfig } from "@/types/content";
import type { ProductSectionContent } from "@/types/products";

const watermark = "/assets/products/shared/109cddbb-f0ab-4d85-b117-906b3cd928a9.png";

const breadcrumbs = (current: string) =>
  [
    {
      label: "Главная страница",
      to: "/",
      showHomeIcon: true,
    },
    {
      label: current,
      current: true,
    },
  ] as const;

export interface StaticImageItem {
  readonly id: string;
  readonly image: string;
  readonly imageAlt: string;
}

export interface StaticFeatureSection extends ProductSectionContent {
  readonly id: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageSide: "left" | "right";
}

export const designHero: InnerPageHeroConfig = {
  image: "/assets/products/design/d71dbba5-5cfe-4077-a1bc-5967156d0b84.jpg",
  imageAlt: "南洋迪克设计系统设计顾问吴滨",
  title: "Система дизайна",
  subtitle: "设计系统",
  watermark,
  breadcrumbs: breadcrumbs("Система дизайна"),
  aspectRatio: [6299, 3543],
} as const;

export const designMatrixImages: readonly StaticImageItem[] = [
  {
    id: "design-01",
    image: "/assets/products/design/b7982cd4-9da0-4f4f-acf1-444d16310123.jpg",
    imageAlt: "南洋迪克原创家居设计一",
  },
  {
    id: "design-02",
    image: "/assets/products/design/75b36223-ec97-41ce-a8df-15f6cd249ccd.png",
    imageAlt: "南洋迪克原创家居设计二",
  },
  {
    id: "design-03",
    image: "/assets/products/design/bbc22b52-253e-4e9c-a425-33befd48a5fd.jpg",
    imageAlt: "南洋迪克原创家居设计三",
  },
  {
    id: "design-04",
    image: "/assets/products/design/0222ecf5-1476-4056-a322-f3a63618228f.jpg",
    imageAlt: "南洋迪克原创家居设计四",
  },
  {
    id: "design-05",
    image: "/assets/products/design/83879499-9414-4c8a-9b5c-330284329841.jpg",
    imageAlt: "南洋迪克原创家居设计五",
  },
  {
    id: "design-06",
    image: "/assets/products/design/e2c349d3-ca54-4781-bc48-4098f1579b10.jpg",
    imageAlt: "南洋迪克原创家居设计六",
  },
  {
    id: "design-07",
    image: "/assets/products/design/c02749ca-b5f3-43fa-ab0b-cd2ecf878ae4.jpg",
    imageAlt: "南洋迪克原创家居设计七",
  },
  {
    id: "design-08",
    image: "/assets/products/design/d7f68188-2641-400f-967a-4a7f7be4f23c.jpg",
    imageAlt: "南洋迪克原创家居设计八",
  },
  {
    id: "design-09",
    image: "/assets/products/design/5e8bcf2d-9a0c-4523-9672-c75ab640ab87.jpg",
    imageAlt: "南洋迪克原创家居设计九",
  },
] as const;

export const designOriginal = {
  title: "Авторский дизайн",
  subtitle: "Продуманный дизайн к месту — проектирование идеальной жизни",
  description:
    "NEODKO — влиятельная восточная сила в современной интерьерной индустрии. На протяжении 24 лет бренд развивает авторский восточный дизайн, неизменно поддерживает качество и инновации, осмысляет эпоху, дом и культуру человека и задает новые тенденции авторского дизайна премиальной мебели в Китае.",
  mainImage: "/assets/products/design/4b766bc9-818d-474b-afa7-fbb4087287f7.jpg",
  detailImage: "/assets/products/design/8fddff84-7204-49f9-adee-8ea67709d4a0.jpg",
  ornament: "/assets/products/design/15b031f4-5bca-4e56-8aae-690f808db43e.jpg",
  mark: "/assets/products/design/557877c7-e9fc-402d-abe3-552b66c849d7.png",
} as const;

export const designPower = {
  title: "Дизайнерский потенциал NEWNOBEL",
  subtitle: "Когда мысли устремлены ввысь, дом наполняется теплом",
  description:
    "«Сила дизайна» — душа комплексных интерьерных решений NEWNOBEL. Она восполняет дефицит качественного комплексного проектирования на рынке и позволяет сосредоточиться на настоящей разработке пространства и продукции, избегать однообразия и демонстрировать конкурентоспособность мирового уровня.",
  image: "/assets/products/design/79a1d919-60f3-4e42-a600-b74538c8bdde.jpg",
} as const;

export const processHero: InnerPageHeroConfig = {
  image: "/assets/products/process/e2098136-e0c0-4215-a40e-b46490d10b79.png",
  imageAlt: "南洋迪克工艺系统皮革缝制工艺",
  title: "Технологическая система",
  subtitle: "工艺系统",
  watermark,
  breadcrumbs: breadcrumbs("Технологическая система"),
  aspectRatio: [1920, 1080],
} as const;

export const processSections: readonly StaticFeatureSection[] = [
  {
    id: "international-craft",
    title: "Международный взгляд и выдающееся мастерство",
    description:
      "NEODKO обладает открытым и многогранным международным взглядом. Опираясь на реалии современной городской жизни и потребности китайской аудитории премиум-класса, бренд создает художественные интерьеры в духе восточного минимализма, соединяя международную лаконичность с традициями восточной эстетики. В каждом изделии внимание к деталям дизайна сочетается с функциональностью, а премиальные материалы и передовые технологии создают уникальную жилую среду и исключительный образ жизни.",
    image: "/assets/products/process/c4a23513-6db1-41fc-9f84-b0b6ac850d74.jpg",
    imageAlt: "POSEENA空间陈列与匠心工艺",
    imageSide: "left",
  },
  {
    id: "leading-craft",
    title: "Лидерский потенциал и безупречное мастерство",
    description:
      // "现代化3.0整装智能生产线、全球高精尖智造设备、核心管理设计师研发团队、强大国际供应端、企业专属定制原材料等优势，为南洋迪克在产品制造方面带来了强大的竞争力。从材料研发设计到拆单、拆单到生产、生产到数字化管理，南洋迪克已完成工业4.0的柔性定制系统，严格管控每一步产品制造过程，确保每一件出厂送到用户手上的产品，都符合高品质标准。",
      "Современные интеллектуальные производственные линии 3.0, передовое оборудование мирового уровня, сильная команда управления, дизайнеров и разработчиков, надежные международные поставки и специально изготовленное сырье обеспечивают NEODKO высокую конкурентоспособность. От разработки материалов и конструкторской деталировки до производства и цифрового управления компания выстроила гибкую систему индивидуального изготовления уровня Индустрии 4.0 и строго контролирует каждый этап, чтобы каждое изделие соответствовало высоким стандартам качества.",
    image: "/assets/products/process/fd7db72f-21c5-4a2d-bb06-2cc33c1e7ca1.jpg",
    imageAlt: "南洋迪克高精尖智能加工设备",
    imageSide: "right",
  },
] as const;

export const processClosingImage =
  "/assets/products/process/fdf04945-c6b4-4d62-8f4a-37a2fd2ade43.jpg";

export const intelligentHero: InnerPageHeroConfig = {
  image: "/assets/products/intelligent/ce8a6d2b-e662-4ca4-858e-db1750e9cc83.jpg",
  imageAlt: "南洋迪克智能家居系统",
  title: "Интеллектуальная система",
  subtitle: "智能系统",
  watermark,
  breadcrumbs: breadcrumbs("Интеллектуальная система"),
  aspectRatio: [1920, 960],
} as const;

export const intelligentSections: readonly StaticFeatureSection[] = [
  {
    id: "smart-home",
    title: "Система умного дома",
    subtitle: "Умная жизнь",
    description:
      "Передовые технологии и мастерство формируют единую систему умного дома. Ориентированный на человека интеллект естественно входит в повседневную жизнь, наполняет каждый уголок светом и повышает комфорт и ощущение благополучия.",
    image: "/assets/products/intelligent/e51b121d-f1d0-487c-b4a3-47f3736e5f42.jpg",
    imageAlt: "智慧生活智能镜与收纳系统",
    imageSide: "left",
  },
  {
    id: "private-home",
    title: "Частная резиденция",
    subtitle: "Технологичный образ жизни",
    description:
      "Улучшая взаимодействие с пользователем, система в дальнейшем объединит освещение, контроль качества воды, микроклимат и другие функции. Их согласованная работа создаст целостные сценарии умного дома и выведет качество жизни на новый уровень.",
    image: "/assets/products/intelligent/d2060806-1b00-4e4c-b12a-e84cf0741edb.jpg",
    imageAlt: "私家大宅智能灯光与家居细节",
    imageSide: "right",
  },
  {
    id: "smart-wave",
    title: "Новая волна умного дома",
    subtitle: "Коснись — и живёт",
    description: "Новая волна умного дома наполняет жизнь светом: одно касание — и дом понимает вас лучше.",
    image: "/assets/products/intelligent/c5731a1a-f4da-4548-8a71-177bef9321aa.png",
    imageAlt: "智能影音家居空间",
    imageSide: "left",
  },
] as const;

export const intelligentClosingImage =
  "/assets/products/intelligent/63e67b12-1e78-4771-93f5-66a3e36e2f92.jpg";
