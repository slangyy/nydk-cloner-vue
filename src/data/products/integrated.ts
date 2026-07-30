import type {
  IntegratedSystemVariant,
  IntegratedVariantKey,
  IntegratedVariantTab,
  ProductCarouselSlide,
} from "@/types/products";

const assetRoot = "/assets/products/integrated";
const watermark =
  "/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png";
const description =
  "以专业化与信息化推出实木定制尊享服务，服务涵盖材质多元化定制及各功能区域定制两大版块，为新世代打全屋尊享原创家具。";
const english =
  "We launch solid wood customized exclusive services with specialization and informatization, covering two major areas: diversified material customization and customization of various functional areas, providing original furniture for the new generation to enjoy throughout the house.";

const doorSlideFiles = [
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

const wallSlideFiles = [
  "082f5249-e7e6-4f54-bb7b-70696690bf78.jpg",
  "a1d03568-a863-4996-a449-af75c9797328.jpg",
  "8451c011-bfb4-49ab-a033-20baf58ecefa.jpg",
  "97628605-0d8e-41a5-8b76-c5886e3a28d7.jpg",
  "65b38e15-ecfe-4874-83cc-47db1fb3a8e8.jpg",
  "63c7ade3-062c-48a3-a078-ba7ccfc6b1e9.jpg",
  "220165c6-1544-4884-b904-3565167d632b.jpg",
  "b53aa3db-169e-48b8-97e2-75bdd67ea66a.jpg",
  "dc591fef-03c1-4844-874a-cc37038cd5c0.jpg",
  "3babfcf3-f3cb-4ebf-ac4b-f5cf372bc39f.jpg",
  "d7c3388e-fd0e-40f7-a4d8-f735b3ce567f.jpg",
  "14316169-6842-4bec-9658-c24ea87119bb.jpg",
  "a8ae6386-6f14-404b-ba43-6fe7043b5e0d.jpg",
  "d40ea1d5-0048-4860-99f0-8cd12f636697.jpg",
  "d1411edb-9150-431a-88f6-f6d93cbcac00.jpg",
  "5983e906-629d-4171-886d-f662e984ffad.jpg",
  "1c1b23fb-12be-4863-a0a6-eba1cc4e001c.jpg",
  "21f7691a-83b9-4b37-8242-71e647fcae08.jpg",
  "100da2de-8f71-4f53-85ad-e40be5c7b091.jpg",
  "71d5c8ad-7347-4163-9daf-ee09539f5822.jpg",
  "ef8a46c8-159d-4688-b6c1-3e232395882f.jpg",
  "1684c74a-5958-4d36-8510-1d88c2e0c9e1.jpg",
  "6c931052-fc28-4866-b15b-9a0a47dc5cff.jpg",
  "0772ff7d-de1e-4217-876a-25decbbea9e4.jpg",
  "cf0d3ed1-4def-4dc2-a4a6-b43ec88fbfc1.jpg",
  "b5cdf4c9-7f68-4c40-b2d6-28604c260545.jpg",
  "ee648eb1-934d-4cc8-af94-6318aac59bc6.jpg",
  "55b702a4-77a2-4918-af90-5872f36ff236.jpg",
  "bdf423ed-f9ee-4495-bbd5-69d5eec6b064.jpg",
  "fcaac60b-6b86-48df-bbf2-189d2a3857cc.jpg",
  "c9e58f4a-f0a5-4261-b2ee-9e279f0279bc.jpg",
  "2a4bcaa9-262f-4e68-bafe-d994f50aaa09.jpg",
  "4584cd45-a783-4b6f-b161-a7ded31486c8.jpg",
  "784028a1-162e-497c-bf00-f32da0f5e2d9.jpg",
  "fa8a982d-c149-4e8c-8882-8d31a62a968c.jpg",
  "18cc9ebf-0ecd-4e73-b549-389af8104722.jpg",
  "464de922-1948-40d2-b841-59f3d39b2706.jpg",
] as const;

const cabinetSlideFiles = [
  "5d96c209-95e3-4d3b-b723-e4274efc2e71.jpg",
  "3b4025f6-613f-4ee3-a469-754af3861229.jpg",
  "f36272d3-b52a-499c-8d64-bb128cf6c898.jpg",
  "9ceae613-4f92-4198-a76a-04623cafa52e.jpg",
  "f3d1f111-84c1-404d-8dfb-940865dc9378.jpg",
  "b217f518-c5c5-4744-a0ed-b4d556729513.jpg",
  "69896d0e-3810-4cef-9632-73e099a2cd4c.jpg",
  "f10556e5-63f7-499a-a2d2-a6e740e5be6d.jpg",
  "5f3858c6-0dc4-4988-8d68-d8286ca2b13a.jpg",
  "dfbc4103-2ae6-4b85-9e48-0c0c53ad6023.jpg",
  "02267412-6a21-42a1-9971-21c562c98127.jpg",
  "a1eaeed6-ec88-4740-b0db-68ee18abc9e8.jpg",
  "24cb4d42-b866-4390-a6cd-a43906e885e5.jpg",
  "15399cbb-ec9d-42fe-804c-630f5ebb9be0.jpg",
  "dc6ae67e-e70b-4f86-9a9f-ba818a9ae86f.jpg",
  "882ec234-280c-4a57-b20c-59ce8b000d65.jpg",
  "5a49e158-8514-41fb-9e76-3fcb43fde83d.jpg",
  "a06380ad-f031-4724-b3b1-faff2df4dc7f.jpg",
  "c072ca1d-3d33-4fbb-b867-593dca726ce1.jpg",
  "cb7f7936-1f09-4568-9bb2-3253742bef0f.jpg",
  "d9516c9f-62b6-45d4-bd97-07c3e3ede40b.jpg",
  "d49bbc59-6c12-4a7d-8328-26d75ea0164b.jpg",
  "5fa86d22-1aac-4005-ad11-0c0192032992.jpg",
  "c1068285-eb82-47a8-9d92-a579e3b39637.jpg",
] as const;

function createSlides(
  key: IntegratedVariantKey,
  label: string,
  directory: "" | "wall" | "cabinet",
  files: readonly string[],
): readonly ProductCarouselSlide[] {
  const prefix = directory ? `${assetRoot}/${directory}` : assetRoot;

  return Object.freeze(
    files.map((file, index) => ({
      id: `${key}-${index + 1}`,
      image: `${prefix}/${file}`,
      imageAlt: `南洋迪克整装系统${label}细节${index + 1}`,
    })),
  ) satisfies readonly ProductCarouselSlide[];
}

const doorSlides = createSlides("door", "门", "", doorSlideFiles);
const wallSlides = createSlides("wall", "墙", "wall", wallSlideFiles);
const cabinetSlides = createSlides(
  "cabinet",
  "柜",
  "cabinet",
  cabinetSlideFiles,
);

export const integratedVariantTabs = [
  {
    key: "door",
    label: "门",
    route: "/FixedInstallation_1",
    sprite: `${assetRoot}/32a77d50-f4d2-46f4-a382-06a8080b6485.jpg`,
  },
  {
    key: "wall",
    label: "墙",
    route: "/FixedInstallation_2",
    sprite: `${assetRoot}/d3a4d384-4c2f-4bc1-b9c9-867c3460c56c.jpg`,
  },
  {
    key: "cabinet",
    label: "柜",
    route: "/FixedInstallation_3",
    sprite: `${assetRoot}/1953e757-2377-4c58-8731-0be58f4a83ea.jpg`,
  },
] as const satisfies readonly IntegratedVariantTab[];

export const integratedSystemVariants = {
  door: {
    key: "door",
    route: "/FixedInstallation_1",
    pageTitle: "门",
    hero: {
      image: `${assetRoot}/5ade15ea-c638-464e-a03d-f3681882c95e.png`,
      imageAlt: "整装系统",
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
    introduction: {
      title: "门",
      subtitle: "全屋整装，尊享定制",
      description,
      english,
    },
    slides: doorSlides,
  },
  wall: {
    key: "wall",
    route: "/FixedInstallation_2",
    pageTitle: "墙",
    hero: {
      image: `${assetRoot}/wall/47969cad-e928-46e2-8509-f1f405f14278.png`,
      imageAlt: "固装系统",
      title: "Customeized System",
      subtitle: "固装系统",
      watermark,
      aspectRatio: [1920, 1080],
      breadcrumbs: [
        {
          label: "网站首页",
          to: "/",
          showHomeIcon: true,
        },
        {
          label: "墙",
          current: true,
        },
      ],
    },
    introduction: {
      title: "墙",
      subtitle: "全屋整装、尊享定制",
      description,
      english,
    },
    slides: wallSlides,
  },
  cabinet: {
    key: "cabinet",
    route: "/FixedInstallation_3",
    pageTitle: "柜",
    hero: {
      image: `${assetRoot}/cabinet/12fff885-b586-4936-89d0-f124e0297a61.png`,
      imageAlt: "固装系统",
      title: "Customeized System",
      subtitle: "固装系统",
      watermark,
      aspectRatio: [1920, 1080],
      breadcrumbs: [
        {
          label: "网站首页",
          to: "/",
          showHomeIcon: true,
        },
        {
          label: "柜",
          current: true,
        },
      ],
    },
    introduction: {
      title: "柜",
      subtitle: "全屋整装，尊享定制",
      description,
      english,
    },
    slides: cabinetSlides,
  },
} as const satisfies Readonly<
  Record<IntegratedVariantKey, IntegratedSystemVariant>
>;
