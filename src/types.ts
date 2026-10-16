export type IconVariant = 'outline' | 'bold' | 'bold-duotone';

export interface IconItem {
  id: string;
  name: string;
  pascal: string;
  category: string;
  aliases: string[];
  variants: IconVariant[];
}

export interface CategoryInfo {
  name: string;
  count: number;
}

export interface IconsIndexData {
  totalIcons: number;
  totalVariants: number;
  categories: CategoryInfo[];
  icons: IconItem[];
}

export type ActiveTab = 'icons' | 'react' | 'laravel' | 'about';
