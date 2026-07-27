export interface NavItem {
  readonly label: string;
  readonly english: string;
  readonly href: string;
  readonly external?: boolean;
  readonly children?: readonly NavItem[];
}

export interface SystemCard {
  readonly id: string;
  readonly title: string;
  readonly english: string;
  readonly description: string;
  readonly image: string;
  readonly detailImage: string;
  readonly href: string;
}

export interface SpaceSlide {
  readonly id: string;
  readonly title: string;
  readonly english: string;
  readonly image: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface DesignerCard {
  readonly id: string;
  readonly image: string;
  readonly mobileImage?: string;
  readonly isBrandCard?: boolean;
  readonly href?: string;
}

export interface CaseSlide {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface NewsItem {
  readonly id: string;
  readonly date: string;
  readonly year: string;
  readonly title: string;
  readonly summary: string;
  readonly image: string;
  readonly href: string;
}

export interface FooterContact {
  readonly icon: "phone" | "location" | "join" | "mail";
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}
