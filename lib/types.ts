export type FrontMatter = {
  title: string;
  date: number;
  draft: boolean;
  slug: string;
  category: string;
  tags: string[];
  lastmod: number;
  featured?: boolean;
  excerpt: string;
  cover: string;
};
