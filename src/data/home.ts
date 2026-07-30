import type {
  DesignerCard,
  FooterContact,
  NavItem,
  NewsItem,
  SpaceSlide,
  SystemCard,
} from "@/types/content";

const asset = (filename: string): string => `/assets/images/${filename}`;

export const productNavItems: readonly NavItem[] = [
  { label: "设计系统", english: "Design System", href: "/design" },
  { label: "生产系统", english: "Production System", href: "/intelligence" },
  { label: "工艺系统", english: "Process System", href: "/technique" },
  { label: "智能系统", english: "Intelligent System", href: "/Zhijia" },
  { label: "成品系统", english: "Product System", href: "/home_decoration_p5" },
  { label: "材料系统", english: "Material Systems", href: "/material" },
  { label: "整装系统", english: "Integrated System", href: "/FixedInstallation_1" },
  { label: "服务系统", english: "Service System", href: "/SaveWorry" },
] as const;

export const aboutNavItems: readonly NavItem[] = [
  { label: "品牌介绍", english: "Brand Introduction", href: "/about?p=0" },
  { label: "发展历程", english: "Development History", href: "/about?p=1" },
  { label: "荣誉资质", english: "Honorary Qualifications", href: "/about?p=2" },
  { label: "新闻动态", english: "News Updates", href: "/News_updates?p=3" },
  { label: "影像活动", english: "Image Activity", href: "/videos?p=4" },
] as const;

export const mainNavItems: readonly NavItem[] = [
  { label: "新诺博", english: "NewBobel", href: "/ExtremeSystem" },
  // { label: "联系", english: "Contact", href: "/ContactUs.html" },
  { label: "产品", english: "Product", href: "#", children: productNavItems },
  {
    label: "案例",
    english: "Case",
    href: "/cases",
  },
  // { label: "商业", english: "Cooperate", href: "/BusinessModel.html" },
  // { label: "关于", english: "Neodko", href: "/about.html", children: aboutNavItems },
] as const;

export const systemCards: readonly SystemCard[] = [
  {
    id: "design",
    title: "设计系统",
    english: "Design system",
    description: "用户至上，一对一全案专属设计",
    image: asset("93ec5ad0-fb99-47d3-a0cf-c132be4d08f6.jpg"),
    detailImage: asset("534f87e0-f8cd-41e5-9b95-7caa1ac40c4d.jpg"),
    href: "/design",
  },
  {
    id: "production",
    title: "生产系统",
    english: "Production system",
    description: "用户至上，一对一全案专属设计",
    image: asset("1aa132c4-de87-476a-b0c2-f66d9b68c8fa.jpg"),
    detailImage: asset("6b4e4c9e-1900-4c7d-b6c2-e90a8e304004.jpg"),
    href: "/intelligence",
  },
  {
    id: "process",
    title: "工艺系统",
    english: "Process system",
    description: "用户至上，一对一全案专属设计",
    image: asset("1682dc8e-eb38-47e8-94ab-5a7e3cbd6bf4.jpg"),
    detailImage: asset("faebc217-5f08-4a65-87a8-95820680f78d.jpg"),
    href: "/technique",
  },
  {
    id: "smart-home",
    title: "智能系统",
    english: "Smart home system",
    description: "用户至上，一对一全案专属设计",
    image: asset("b73a8ba2-2086-4f23-b1ac-93e162a4d995.jpg"),
    detailImage: asset("3303a17f-a199-4732-8e05-3bef2a165e69.jpg"),
    href: "/Zhijia",
  },
  {
    id: "product",
    title: "成品系统",
    english: "Pruduct system",
    description: "用户至上，一对一全案专属设计",
    image: asset("6e40e528-b752-41dd-8691-f8bba566d3ad.jpg"),
    detailImage: asset("9befa60c-35e0-425c-84b1-f1c669a55ba9.jpg"),
    href: "/home_decoration_p5",
  },
  {
    id: "material",
    title: "材料系统",
    english: "Material system",
    description: "用户至上，一对一全案专属设计",
    image: asset("4dbea946-5c74-4478-b283-282d362300ab.jpg"),
    detailImage: asset("8a53fda8-4a3b-443f-b96c-333d5a7f0f2c.jpg"),
    href: "/material",
  },
  {
    id: "integrated",
    title: "整装系统",
    english: "Integrated System",
    description: "用户至上，一对一全案专属设计",
    image: asset("b6b9e006-e4c7-4b33-8c70-f2de0f8e4cda.jpg"),
    detailImage: asset("83e32388-b530-4cfc-9064-23cedc3c7f99.jpg"),
    href: "/FixedInstallation_1",
  },
  {
    id: "service",
    title: "服务系统",
    english: "Service system",
    description: "用户至上，一对一全案专属设计",
    image: asset("b73a8ba2-2086-4f23-b1ac-93e162a4d995.jpg"),
    detailImage: asset("9f70d279-14a6-4a6f-9067-30e93fd1b5d1.jpg"),
    href: "/SaveWorry",
  },
] as const;

export const systemsBrandImage = asset("65d4aba6-c8d4-423b-8c92-31873531456b.png");

export const spaceSlides: readonly SpaceSlide[] = [
  {
    id: "entrance",
    title: "入户空间",
    english: "ENTRANCE SPACE",
    image: asset("f281fbf9-7130-48bf-879a-a1ea5773eba7.jpg"),
    icon: asset("864b361d-3601-4741-8780-cdfd494ca34c.png"),
    href: "/home_decoration_p5.html",
  },
  {
    id: "visitor",
    title: "会客空间",
    english: "VISITOR SPACE",
    image: asset("f4bbb759-e522-4d10-bb9e-ff4fb4ca6afc.jpg"),
    icon: asset("0da01016-91ee-4194-ad3c-a61a301cb75e.png"),
    href: "/home_decoration_p5.html?p=1",
  },
  {
    id: "dining",
    title: "餐厨空间",
    english: "ENTRANCE SPACE",
    image: asset("3d136554-13fe-4115-ae0f-489a4accee22.jpg"),
    icon: asset("5995f086-6fc2-4779-939a-44484f734b56.png"),
    href: "/home_decoration_p5.html?p=2",
  },
  {
    id: "study",
    title: "书茶空间",
    english: "ENTRANCE SPACE",
    image: asset("a8ec183b-0dfc-48d5-ad20-b50711b14083.jpg"),
    icon: asset("5995f086-6fc2-4779-939a-44484f734b56.png"),
    href: "/home_decoration_p5.html?p=3",
  },
  {
    id: "sleep",
    title: "睡眠空间",
    english: "VISITOR SPACE",
    image: asset("71c4fbe8-3d35-4446-9ea3-a1f7b20ef437.jpg"),
    icon: asset("11dafaa9-48ee-4194-9107-ab3d537a3698.png"),
    href: "/home_decoration_p5.html?p=4",
  },
  {
    id: "cloakroom",
    title: "衣帽空间",
    english: "VISITOR SPACE",
    image: asset("c2a6e713-2d06-49ea-822d-163acd81e723.jpg"),
    icon: asset("8ef3ab73-8c66-4b4a-9156-4893a068c72e.png"),
    href: "/home_decoration_p5.html?p=5",
  },
] as const;

export const designerCards: readonly DesignerCard[] = [
  { id: "designer-1", image: asset("c59e253c-84e3-4565-bb96-89c639f66eed.jpg") },
  { id: "designer-2", image: asset("a5947dc6-dd8e-4064-a883-ed310f1b9862.jpg") },
  { id: "designer-3", image: asset("5e5cb6e8-450e-4a1e-bcde-31c6445ff7d2.jpg") },
  { id: "designer-4", image: asset("a4ee18f9-0ae0-4118-a8c8-f4fd071cea4c.jpg") },
  { id: "designer-5", image: asset("b502f7ec-6c8c-4f47-a5da-6abb1275b697.jpg") },
  {
    id: "designer-brand",
    image: asset("bf4cf3b1-d2a9-460a-918a-cb6290e41bbc.jpg"),
    mobileImage: asset("f233eb78-6457-4583-8535-12ddf344d80c.jpg"),
    isBrandCard: true,
    href: "/design.html",
  },
] as const;

export const newsItems: readonly NewsItem[] = [
  {
    id: "45",
    date: "07.10",
    year: "2026",
    title: "领见生活 格调进阶",
    summary: "作为东方木艺美学的代表，南洋迪克携迭代升级的“领见生活”精彩亮相",
    image: asset("474af248-ca5a-4d21-8b0a-6344ccc606bc.jpg"),
    href: "/NewsUpdates_des/45.html",
  },
  {
    id: "44",
    date: "06.30",
    year: "2026",
    title: "领见生活 再续回响",
    summary: "南洋迪克，邀您共鉴。向世界，见东方。",
    image: asset("19fc85d9-74d2-492e-a911-6465ac8d9497.png"),
    href: "/NewsUpdates_des/44.html",
  },
  {
    id: "43",
    date: "06.09",
    year: "2026",
    title: "世界斯诺克冠军吴宜泽正式出任南洋迪克全球形象代言人",
    summary:
      "本次战略合作，是南洋迪克面向全球化市场的一次重要品牌升维动作，标志着品牌正式迈入更国际化、更年轻化、更高质感的全新发展阶段。",
    image: asset("de694793-9d64-4345-8cc2-63ff210aa6e4.jpg"),
    href: "/NewsUpdates_des/43.html",
  },
  {
    id: "42",
    date: "05.28",
    year: "2026",
    title: "一境入宋 万象归一",
    summary: "南洋迪克【境界】西安旗舰店，即将盛大启幕！",
    image: asset("a84df03d-2a8d-4a2d-a04b-e5e06bbf4fb5.jpg"),
    href: "/NewsUpdates_des/42.html",
  },
] as const;

export const footerContacts: readonly FooterContact[] = [
  {
    icon: "phone",
    label: "全国服务热线",
    value: "400-6638-999",
    href: "tel:400-6638-999",
  },
  {
    icon: "location",
    label: "公司地址",
    value: "陕西省西安市长安区秦创原顺兴路88号",
  },
  {
    icon: "join",
    label: "加盟电话",
    value: "13928655555 张先生",
    href: "tel:13922793222",
  },
  {
    icon: "mail",
    label: "服务邮箱",
    value: "17868344634@163.com",
    href: "mailto:17868344634@163.com",
  },
] as const;

export const footerBrandLogo = asset("b654ba19-270e-4f71-8f05-9a0613b05fef.png");
export const footerQrCode = asset("495b445c-aaee-44cb-bc02-ab11ecae1abe.jpg");

export const heroVideo = "/assets/video/36304d3c-8931-47bd-996e-e6d8721206da.mp4";
export const heroPoster =
  "/assets/backgrounds/36304d3c-8931-47bd-996e-e6d8721206da.jpg";

export const pageNames: Readonly<Record<string, string>> = {
  "/cases": "案例",
  "/design": "设计系统",
  "/intelligence": "生产系统",
  "/technique": "工艺系统",
  "/Zhijia": "智能系统",
  "/home_decoration_p5": "成品系统",
  "/material": "材料系统",
  "/FixedInstallation_1": "整装系统",
  "/SaveWorry": "服务系统",
  
  "/News_updates": "新闻动态",
  "/videos": "影像活动",
  "/ExtremeSystem": "普西纳",
  "/ContactUs": "联系我们",
  "/BusinessModel": "商业合作",
};
