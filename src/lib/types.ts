import { Blog } from '.contentlayer/generated/types';

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
  | 'inktober2022'
  | 'joelmturner_abcs2017'
  | 'joelmturner_featured'
  | 'letterclash';

export type IllustrationItem = {
  id: string;
  url: string;
  tags: string[];
  height: number;
  width: number;
};
export type Illustrations = {
  [key in IllustrationTag]: IllustrationItem[];
};

export type PostType = 'post' | 'til';

export type CloudinaryResponse = { resources: CloudinaryImageResult[] };
export type CloudinaryImageResult = {
  asset_id: string;
  public_id: string;
  folder: string;
  filename: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  uploaded_at: string;
  bytes: number;
  backup_bytes: number;
  width: number;
  height: number;
  aspect_ratio: number;
  pixels: number;
  tags: string[];
  url: string;
  secure_url: string;
  status: string;
  access_mode: string;
  access_control: any;
  etag: string;
  created_by: CreatedBy;
  uploaded_by: UploadedBy;
};

export type CreatedBy = {
  access_key: string;
};

export type UploadedBy = {
  access_key: string;
};

export type PostCard = Pick<
  Blog,
  'title' | 'slug' | 'cover' | 'date' | 'category' | 'tags' | 'excerpt'
>;
