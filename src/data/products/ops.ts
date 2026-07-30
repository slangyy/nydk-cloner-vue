import type {
  MaterialItem,
  ProductCarouselSlide,
  ProductPageConfig,
  ProductionCapability,
  ServiceStep,
} from "@/types/products";

const sharedWatermark =
  "/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png";

function productBreadcrumb(label: string) {
  return [
    {
      label: "网站首页",
      to: "/",
      showHomeIcon: true,
    },
    {
      label,
      current: true,
    },
  ] as const;
}

export const productionPage: ProductPageConfig = {
  key: "production",
  hero: {
    image:
      "/assets/products/production/19fe5cb7-eb90-45ed-a0f1-dcaa12ce1760.png",
    imageAlt: "南洋迪克智能生产设备",
    title: "PRODUCTION SYSTEM",
    subtitle: "生产系统",
    watermark: sharedWatermark,
    breadcrumbs: productBreadcrumb("生产系统"),
    aspectRatio: [1920, 1080],
  },
} as const;

export const productionCapabilities: readonly ProductionCapability[] = [
  {
    id: "factory",
    title: "工厂",
    description: ["现代化3.0", "整装智能生产线"],
    icon: "/assets/products/production/aad9657f-5f6d-40c5-b301-80ec42ebe34e.png",
  },
  {
    id: "equipment",
    title: "设备",
    description: ["台湾、德国", "意大利高精尖设备"],
    icon: "/assets/products/production/df95f5ca-2b97-449a-80d2-7d4cedc3db23.png",
  },
  {
    id: "team",
    title: "团队",
    description: ["核心管理·设计师研发", "团队·高级技工"],
    icon: "/assets/products/production/b28d991a-1b04-461a-ad56-977dae31db27.png",
  },
  {
    id: "environment",
    title: "环保",
    description: ["沸石转轮+RTO", "有机废气治理设施"],
    icon: "/assets/products/production/98899d2f-4048-4237-a54d-1c2b482eeb6d.png",
  },
  {
    id: "supply",
    title: "供应",
    description: ["强大的国际供应端", "企业专属定制原材料"],
    icon: "/assets/products/production/0181bbe5-f534-42bb-8b87-9fbcd95894d5.png",
  },
] as const;

export const productionEquipmentDescription =
  "现代化3.0生产基地占地260亩、建筑面积180000平方米、整装智能生产线、台湾、德国、意大利高精尖设备1000多台。";

export const productionEquipmentSlides: readonly ProductCarouselSlide[] = [
  {
    id: "production-equipment-1",
    image:
      "/assets/products/production/dc481780-f5a3-42bd-b6c6-43d6de96babc.jpg",
    imageAlt: "南洋迪克智能加工生产线",
  },
  {
    id: "production-equipment-2",
    image:
      "/assets/products/production/38fec85f-658e-47c8-845a-f8834cb13980.jpg",
    imageAlt: "南洋迪克自动化生产设备",
  },
  {
    id: "production-equipment-3",
    image:
      "/assets/products/production/1ff5662a-e7d4-4b5b-a471-b22e2b66a2f7.jpg",
    imageAlt: "南洋迪克高精尖生产设备",
  },
  {
    id: "production-equipment-4",
    image:
      "/assets/products/production/9c12a662-41ef-478f-9daa-8a9167eb870e.jpg",
    imageAlt: "南洋迪克现代化物流车队",
  },
] as const;

export interface ProductionTeamStat {
  readonly id: string;
  readonly value: string;
  readonly title: string;
}

export const productionTeamStats: readonly ProductionTeamStat[] = [
  { id: "management", value: "100人", title: "核心管理" },
  { id: "design", value: "515人", title: "设计师研发团队" },
  { id: "craft", value: "598人", title: "高级技工" },
] as const;

export const materialPage: ProductPageConfig = {
  key: "material",
  hero: {
    image: "/assets/products/material/4b8392ad-ec58-4a3f-a948-6c35f46d9e07.png",
    imageAlt: "南洋迪克严选木材供应",
    title: "MATERIAL SYSTEMS",
    subtitle: "材料系统",
    watermark: sharedWatermark,
    breadcrumbs: productBreadcrumb("材料系统"),
    aspectRatio: [1920, 1080],
  },
} as const;

export const materialItems: readonly MaterialItem[] = [
  {
    id: "calfskin",
    title: "进口头层小牛皮",
    image: "/assets/products/material/d0c13497-373b-4524-9395-4803c86289b2.jpg",
  },
  {
    id: "mirror",
    title: "智能感光镜",
    image: "/assets/products/material/ee361c42-13b8-4c54-bcf2-935a90fd3695.jpg",
  },
  {
    id: "led",
    title: "LED智能灯带",
    image: "/assets/products/material/d6a23451-23c6-4068-b370-a9838208eaa9.jpg",
  },
  {
    id: "glass",
    title: "高密度通透玻璃",
    image: "/assets/products/material/c241ea3c-6c82-4d0f-a77e-1e1861f713cc.jpg",
  },
  {
    id: "velvet",
    title: "轻柔质感绒面",
    image: "/assets/products/material/74552136-2ec7-49e6-9af3-b41c3ec33eab.jpg",
  },
  {
    id: "paint",
    title: "Pu环保漆",
    image: "/assets/products/material/2f3cbac9-ff7f-4103-ad58-e3c8579b28a3.jpg",
  },
  {
    id: "leather-panel",
    title: "高精度牛皮拼版",
    image: "/assets/products/material/0ab06285-93fa-4fe2-9e29-6e5f53221411.jpg",
  },
  {
    id: "copper",
    title: "铜质装饰",
    image: "/assets/products/material/30854f77-c8e8-44dd-b0c9-7861a6803e64.jpg",
  },
  {
    id: "aluminium",
    title: "高级铝合金",
    image: "/assets/products/material/4c691f32-097c-49d6-ae73-b79361683f8c.jpg",
  },
  {
    id: "leather-soft",
    title: "皮质软包",
    image: "/assets/products/material/a96adb58-5f95-4bb1-97e9-61222fd627fa.jpg",
  },
  {
    id: "fabric-soft",
    title: "质感软包布面",
    image: "/assets/products/material/a39825d0-fd23-48c7-b870-59e51c59b0fd.jpg",
  },
  {
    id: "stone",
    title: "岩板/奢石",
    image: "/assets/products/material/b3dfd456-2e24-46ae-a406-198871c9d920.jpg",
  },
] as const;

export const servicePage: ProductPageConfig = {
  key: "service",
  hero: {
    image: "/assets/products/service/b72d6b72-af88-4ce7-bd6a-c2a4125898ea.png",
    imageAlt: "南洋迪克物流与安装服务团队",
    title: "SERVICE SYSTEM",
    subtitle: "服务系统",
    watermark: sharedWatermark,
    breadcrumbs: productBreadcrumb("服务系统"),
    aspectRatio: [1920, 1080],
  },
} as const;

export const serviceSteps: readonly ServiceStep[] = [
  {
    id: "experience",
    number: "01",
    title: "多维体验",
    subtitle: "竭诚服务",
    icon: "/assets/products/service/bb2635d8-d2c0-4f9a-a119-e8938e492651.png",
  },
  {
    id: "measure",
    number: "02",
    title: "免费测量",
    subtitle: "专业服务",
    icon: "/assets/products/service/ebe30d1d-33e3-48c1-8bcc-7ead90e1c2d3.png",
  },
  {
    id: "quote",
    number: "03",
    title: "免费报价",
    subtitle: "安心服务",
    icon: "/assets/products/service/9f385f03-8e2b-47e0-a599-61b7ce5a891c.png",
  },
  {
    id: "remeasure",
    number: "04",
    title: "上门复尺",
    subtitle: "贴心服务",
    icon: "/assets/products/service/b95492d2-1b17-4d31-b561-fc421952bd94.png",
  },
  {
    id: "design",
    number: "05",
    title: "3D设计",
    subtitle: "智慧服务",
    icon: "/assets/products/service/c9b7e5bc-07cf-4a37-8c0d-b52d5a7125ca.png",
  },
  {
    id: "delivery",
    number: "06",
    title: "免费配送",
    subtitle: "一站服务",
    icon: "/assets/products/service/2e845c76-59af-4c3f-9dd8-f935fdaf1905.png",
  },
  {
    id: "installation",
    number: "07",
    title: "免费安装",
    subtitle: "省心服务",
    icon: "/assets/products/service/7208e734-77aa-40cb-bf23-dcb8d9ed61dc.png",
  },
] as const;

export const servicePowerSlides: readonly ProductCarouselSlide[] = [
  {
    id: "service-system",
    image: "/assets/products/service/04386549-3e56-4c0d-9889-8dc28c126ea3.png",
    imageAlt: "南洋迪克一站式家居服务",
    title: "健全的服务体系",
    description:
      "打造从整体设计到家装实现到家居服务一站式闭环体系，以绝对的落地能力节约客户时间成本。",
  },
  {
    id: "service-capability",
    image: "/assets/products/service/69da60e5-e907-4bdb-9b86-19c14fcd8d71.png",
    imageAlt: "南洋迪克持续家居服务",
    title: "持续的服务能力",
    description:
      "打造循环家具服务体系。持续对客户进行后续服务。如定期收纳整理服务、家政服务等。",
  },
  {
    id: "service-details",
    image: "/assets/products/service/867c5323-6c3a-423d-ba9b-ae891982caed.png",
    imageAlt: "南洋迪克极致服务细节",
    title: "极致的服务细节",
    description:
      "一客一物一品。从细节出发，还原客户需求，满足个性定制，最终实现百分百终端呈现。",
  },
] as const;
