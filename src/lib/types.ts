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
  description?: string;
};

export type IllustrationTag =
  | 'handletteredabcs_2016'
  | 'inktober2017'
  | 'inktober2018'
  | 'inktober2019'
  | 'inktober2021'
  | 'joelmturner_abcs2017'
  | 'joelmturner_featured'
  | 'letterclash';

export type IllustrationItem = { id: string; url: string; tags: string[] };
export type Illustrations = {
  [key in IllustrationTag]: IllustrationItem[];
};
