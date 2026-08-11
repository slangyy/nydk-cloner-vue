import type {
  InnerPageHeroConfig,
  PoseenaCaseSlide,
  PoseenaMentor,
  PoseenaStrategy,
} from "@/types/content";

export const poseenaHero: InnerPageHeroConfig = {
  image: "/assets/poseena/hero.jpg",
  imageAlt: "NEWNOBEL新诺博雪山建筑",
  title: "NEWNOBEL",
  subtitle: "Комплексные интерьерные решения без компромиссов",
  watermark: "/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png",
  breadcrumbs: [
    {
      label: "Главная страница",
      to: "/",
      showHomeIcon: true,
    },
    {
      label: "NEWNOBEL新诺博",
      current: true,
    },
  ],
  overlayHoldMs: 2000,
  overlayFadeMs: 600,
} as const;

export const poseenaMentors: readonly PoseenaMentor[] = [
  {
    id: "wu-fuxiang",
    role: "工艺导师",
    name: "吴富相",
    position: "南洋迪克整装家居总裁 / POSEENA品牌出品人",
    english: "Poseena  Co-producer of the brand",
    achievements: ["30+年木作传承与工匠精神", "家居行业高端家居引领者"],
    image: "/assets/poseena/mentor-wu.jpg",
  },
  {
    id: "li-lirun",
    role: "设计导演",
    name: "李利润",
    position: "猎狐家居研发院长/POSEENA品牌设计导演",
    english: "Poseena  Co-producer of the brand",
    achievements: ["30+年木作传承与工匠精神", "家居行业高端家居引领者"],
    image: "/assets/poseena/mentor-li.jpg",
  },
] as const;

export const poseenaStrategies: readonly PoseenaStrategy[] = [
  {
    id: "home",
    number: "1",
    // title: "1个整宅",
    title: "1 целостный дом",
    lines: [
      // '打破市场品牌的商业模式"以用户思维走进消费者心里',
      // "以整宅为产品",
      // "给消费者一个可以真正可以",
      // "看得见^摸得清的家",
      // "打造用户心中理想的家!",
      "Мы меняем привычную рыночную модель бренда: думаем как клиент и стремимся понять его желания / рассматриваем весь дом как единый продукт / создаем дом, который можно увидеть и ощутить / воплощаем идеальный дом в представлении клиента!"
    ],
  },
  {
    id: "system",
    number: "1",
    // title: "1套体系",
    title: "1 комплексная система",
    lines: [
      // "重塑市场品牌的产品缺陷",
      // "打造一套完整产品体系",
      // "从成品家具客餐厨卧书茶宠物到固装家具门墙柜梯浴顶全面产品输出",
      // "真正系统整装的引领者!",
      "Мы устраняем недостатки разрозненных рыночных предложений / создаем целостную продуктовую систему / предлагаем полный ассортимент: от готовой мебели для гостиной, столовой, кухни, спальни, кабинета, чайной зоны и пространства для домашних животных до встроенных дверей, стеновых панелей, шкафов, лестниц, ванных комнат и потолков / становимся настоящим лидером системного комплексного оснащения!"
    ],
  },
  {
    id: "application",
    number: "6",
    // title: "6大应用",
    title: "6 сфер применения",
    lines: [
      // "颠覆市场品牌的应用边界",
      // "以不限年龄 / 不限风格 / 不限空间 / 不限材质 / 不限户型",
      // "不限国度的6大应用维度",
      // "满足不同用户的需求。",
      "Мы расширяем привычные границы применения бренда / 6 измерений без ограничений по возрасту, стилю, пространству, материалам, планировке и стране / чтобы отвечать потребностям самых разных клиентов."
    ],
  },
] as const;

export const poseenaCases: readonly PoseenaCaseSlide[] = [
   {
    id: "airport-lounge",
    title: "西安·咸阳国际机场三期航站楼商务贵宾厅",
    image: "/assets/poseena/case-airport.jpg",
  },
  {
    id: "taibai-store",
    title: "西安太白店红星美凯龙·全案店",
    image: "/assets/poseena/case-store.jpg",
  },
  {
    id: "hyatt-room",
    title: "西安凯悦酒店标准客房",
    image: "/assets/poseena/case-hyatt.jpg",
  }
 
] as const;
