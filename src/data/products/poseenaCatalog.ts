import type {
  FinishedCatalogGroup,
  FinishedCatalogImage,
  FinishedCatalogSourceId,
} from "@/types/products";

const catalogRoot = "/assets/products/finished/poseena/catalog";

interface ProductCatalogDefinition {
  readonly id: string;
  readonly title: string;
  readonly titleRu: string;
  readonly icon: string;
  readonly count: number;
  readonly firstSlide: number;
  readonly sourceId: FinishedCatalogSourceId;
  readonly sourceLabel: string;
}

const productDefinitions: readonly ProductCatalogDefinition[] = [
  { id: "sofa", title: "沙发", titleRu: "Диваны", icon: "sofa.svg", count: 10, firstSlide: 238, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "chair-stool", title: "椅凳", titleRu: "Стулья и пуфы", icon: "chair-stool.svg", count: 29, firstSlide: 248, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "occasional-table", title: "几类", titleRu: "Журнальные столики", icon: "occasional-table.svg", count: 21, firstSlide: 277, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "cabinet", title: "柜类", titleRu: "Шкафы", icon: "cabinet.svg", count: 14, firstSlide: 298, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "bed", title: "床类", titleRu: "Кровати", icon: "bed.svg", count: 5, firstSlide: 312, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "table", title: "桌类", titleRu: "Столы", icon: "table.svg", count: 15, firstSlide: 317, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "rack", title: "置物架", titleRu: "Стеллажи", icon: "rack.svg", count: 2, firstSlide: 332, sourceId: "poseena", sourceLabel: "POSEENA 普西纳" },
  { id: "yanshan", title: "砚山", titleRu: "YANSHAN", icon: "yanshan.svg", count: 9, firstSlide: 334, sourceId: "yanshan", sourceLabel: "POSEENA · 砚山" },
  { id: "panshi", title: "磐石", titleRu: "PANSHI", icon: "panshi.svg", count: 16, firstSlide: 343, sourceId: "panshi", sourceLabel: "POSEENA · 磐石" },
];

type CaseImageDefinition = readonly [
  filename: string,
  sourceId: FinishedCatalogSourceId,
  sourceLabel: string,
];

const caseImageDefinitions: readonly CaseImageDefinition[] = [
  ["001-source-house-s172.webp", "source-house", "源邸壹号·合院"],
  ["002-source-house-s173.webp", "source-house", "源邸壹号·合院"],
  ["003-source-house-s174.webp", "source-house", "源邸壹号·合院"],
  ["004-source-house-s175.webp", "source-house", "源邸壹号·合院"],
  ["005-source-house-s176.webp", "source-house", "源邸壹号·合院"],
  ["006-source-house-s177.webp", "source-house", "源邸壹号·合院"],
  ["007-source-house-s178.webp", "source-house", "源邸壹号·合院"],
  ["008-source-house-s178.webp", "source-house", "源邸壹号·合院"],
  ["009-source-house-s179.webp", "source-house", "源邸壹号·合院"],
  ["010-greenland-s180.webp", "greenland", "绿地集团"],
  ["011-greenland-s181.webp", "greenland", "绿地集团"],
  ["012-greenland-s182.webp", "greenland", "绿地集团"],
  ["013-greenland-s183.webp", "greenland", "绿地集团"],
  ["014-greenland-s184.webp", "greenland", "绿地集团"],
  ["015-greenland-s185.webp", "greenland", "绿地集团"],
  ["016-greenland-s186.webp", "greenland", "绿地集团"],
  ["017-greenland-s187.webp", "greenland", "绿地集团"],
  ["018-greenland-s188.webp", "greenland", "绿地集团"],
  ["019-greenland-s189.webp", "greenland", "绿地集团"],
  ["020-sunac-qujiang-s190.webp", "sunac-qujiang", "融创·曲江印"],
  ["021-sunac-qujiang-s191.webp", "sunac-qujiang", "融创·曲江印"],
  ["022-sunac-qujiang-s192.webp", "sunac-qujiang", "融创·曲江印"],
  ["023-sunac-qujiang-s193.webp", "sunac-qujiang", "融创·曲江印"],
  ["024-sunac-qujiang-s194.webp", "sunac-qujiang", "融创·曲江印"],
  ["025-sunac-qujiang-s194.webp", "sunac-qujiang", "融创·曲江印"],
  ["026-sunac-qujiang-s195.webp", "sunac-qujiang", "融创·曲江印"],
  ["027-sunac-qujiang-s196.webp", "sunac-qujiang", "融创·曲江印"],
  ["028-venice-wuxinhu-s197.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["029-venice-wuxinhu-s198.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["030-venice-wuxinhu-s199.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["031-venice-wuxinhu-s200.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["032-venice-wuxinhu-s201.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["033-venice-wuxinhu-s202.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["034-venice-wuxinhu-s203.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["035-venice-wuxinhu-s204.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["036-venice-wuxinhu-s205.webp", "venice-wuxinhu", "威尼斯·五鑫湖"],
  ["037-baojie-villa-s206.webp", "baojie-villa", "宝界山庄"],
  ["038-baojie-villa-s207.webp", "baojie-villa", "宝界山庄"],
  ["039-baojie-villa-s208.webp", "baojie-villa", "宝界山庄"],
  ["040-baojie-villa-s209.webp", "baojie-villa", "宝界山庄"],
  ["041-baojie-villa-s210.webp", "baojie-villa", "宝界山庄"],
  ["042-baojie-villa-s211.webp", "baojie-villa", "宝界山庄"],
  ["043-baojie-villa-s212.webp", "baojie-villa", "宝界山庄"],
  ["044-baojie-villa-s213.webp", "baojie-villa", "宝界山庄"],
  ["045-baojie-villa-s216.webp", "baojie-villa", "宝界山庄"],
  ["046-baojie-villa-s217.webp", "baojie-villa", "宝界山庄"],
  ["047-baojie-villa-s218.webp", "baojie-villa", "宝界山庄"],
];

function buildProductImages(
  definition: ProductCatalogDefinition,
): readonly FinishedCatalogImage[] {
  return Array.from({ length: definition.count }, (_, index) => {
    const position = index + 1;
    const slide = definition.firstSlide + index;
    const filename = `${String(position).padStart(3, "0")}-s${slide}.webp`;
    const base = `${catalogRoot}/${definition.id}`;
    return {
      id: `${definition.id}-${String(position).padStart(3, "0")}`,
      src: `${base}/full/${filename}`,
      thumbnail: `${base}/thumbs/${filename}`,
      alt: `${definition.title} · ${definition.sourceLabel} · 第 ${position} 张`,
      sourceId: definition.sourceId,
      sourceLabel: definition.sourceLabel,
    };
  });
}

function buildProductGroup(
  definition: ProductCatalogDefinition,
): FinishedCatalogGroup {
  const gallery = buildProductImages(definition);
  return {
    id: definition.id,
    title: definition.title,
    titleRu: definition.titleRu,
    icon: `${catalogRoot}/icons/${definition.icon}`,
    summary: `${definition.sourceLabel} · 共 ${definition.count} 款产品`,
    coverImage: gallery[0]!.src,
    mediaFit: "contain",
    gallery,
  };
}

const customerCaseGallery: readonly FinishedCatalogImage[] =
  caseImageDefinitions.map(([filename, sourceId, sourceLabel], index) => {
    const position = index + 1;
    const base = `${catalogRoot}/customer-cases`;
    return {
      id: `customer-case-${String(position).padStart(3, "0")}`,
      src: `${base}/full/${filename}`,
      thumbnail: `${base}/thumbs/${filename}`,
      alt: `客户案例 · ${sourceLabel} · 第 ${position} 张`,
      sourceId,
      sourceLabel,
    };
  });

export const poseenaFinishedCatalogGroups: readonly FinishedCatalogGroup[] = [
  ...productDefinitions.map(buildProductGroup),
  {
    id: "customer-cases",
    title: "客户案例",
    titleRu: "Проекты клиентов",
    icon: `${catalogRoot}/icons/customer-cases.svg`,
    summary: "汇集源邸壹号·合院、绿地集团、融创·曲江印、威尼斯·五鑫湖、宝界山庄 5 个超级案例",
    coverImage: customerCaseGallery[0]!.src,
    mediaFit: "cover",
    gallery: customerCaseGallery,
  },
];

function validateCatalog(groups: readonly FinishedCatalogGroup[]): void {
  if (groups.length !== 10) {
    throw new Error(`POSEENA catalog must contain 10 groups, received ${groups.length}`);
  }
  const ids = new Set<string>();
  const imageIds = new Set<string>();
  for (const group of groups) {
    if (ids.has(group.id) || group.gallery.length === 0) {
      throw new Error(`Invalid POSEENA catalog group: ${group.id}`);
    }
    ids.add(group.id);
    if (group.coverImage !== group.gallery[0]?.src) {
      throw new Error(`Catalog cover must equal first image: ${group.id}`);
    }
    for (const image of group.gallery) {
      if (imageIds.has(image.id)) {
        throw new Error(`Duplicate POSEENA catalog image id: ${image.id}`);
      }
      imageIds.add(image.id);
    }
  }
}

validateCatalog(poseenaFinishedCatalogGroups);


