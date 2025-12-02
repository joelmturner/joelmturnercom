import type { ILLUSTRATION_QUERY_VS_FILTER } from "./queryParams";

export type TechIcon =
  | "react"
  | "typescript"
  | "chakra ui"
  | "next.js"
  | "panda css"
  | "svelte"
  | "cloudinary";

export type Project = {
  name: string;
  description: string;
  imageURL: string;
  tech: TechIcon[];
  github: string;
  featured: boolean;
  url?: string;
};

export type IllustrationTag =
  | "handletteredabcs_2016"
  | "inktober2017"
  | "inktober2018"
  | "inktober2019"
  | "inktober2021"
  | "inktober2022"
  | "inktober2023"
  | "inktober2024"
  | "inktober2025"
  | "joelmturner_abcs2017"
  | "joelmturner_featured"
  | "jmt_dorbs"
  | "letterclash";

export type IllustrationCollectionParam =
  keyof typeof ILLUSTRATION_QUERY_VS_FILTER;

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

export type PostType = "post" | "til";

export type CreatedBy = {
  access_key: string;
};

export type UploadedBy = {
  access_key: string;
};

export type SocialIconLabel =
  | "Instagram"
  | "Twitter"
  | "Linkedin"
  | "Github"
  | "DEV"
  | "Mastodon"
  | "Bluesky";
