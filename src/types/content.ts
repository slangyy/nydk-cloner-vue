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
  readonly icon: string;
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

export interface InnerPageHeroBreadcrumbItem {
  readonly label: string;
  readonly to?: string;
  readonly current?: boolean;
  readonly showHomeIcon?: boolean;
}

export interface InnerPageHeroConfig {
  readonly image: string;
  readonly imageAlt: string;
  readonly title: string;
  readonly subtitle: string;
  readonly watermark: string;
  readonly breadcrumbs: readonly InnerPageHeroBreadcrumbItem[];
  readonly aspectRatio?: readonly [width: number, height: number];
  readonly overlayHoldMs?: number;
  readonly overlayFadeMs?: number;
}

export interface PoseenaMentor {
  readonly id: string;
  readonly role: string;
  readonly name: string;
  readonly position: string;
  readonly english: string;
  readonly achievements: readonly string[];
  readonly image: string;
}

export interface PoseenaStrategy {
  readonly id: string;
  readonly number: "1" | "6";
  readonly title: string;
  readonly lines: readonly string[];
}

export interface PoseenaCaseSlide {
  readonly id: string;
  readonly title: string;
  readonly image: string;
}
