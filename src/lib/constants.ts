import type { Project, SocialIconLabel } from "./types";
import { type IllustrationTag } from "./types";

export const FUN_STUFF = [ 'brew', 'code', 'letter', 'draw', 'hike', 'camp' ];

export const PROJECTS: Project[] = [
    {
      name: "Instagram To Cloudinary",
      description: "Pulls posts from Instagram and sends them to Cloudinary with tags",
      imageURL: "Illustrations-Joel-M-Turner_ogu9k6.png",
      tech: ["typescript"],
      github: "https://github.com/joelmturner/instagram-cloudinary",
      featured: false,
      url: "/blog/instagram-cloudinary",
    },
  {
    name: "Emotional Recipes",
    description: "A tool to help navigate stormy waters and get back to calm seas.",
    imageURL: "emotional-recipes/recipe_9.webp",
    tech: ["react", "typescript", "chakra ui", "next.js"],
    github: "https://github.com/joelmturner/emotional-recipes",
    featured: false,
    url: "https://emotional-recipes.com",
  },
  {
    name: "PDX Food Weeks",
    description: "Annual celebration of great food weeks in Portland, Oregon.",
    imageURL: "pdx-food-weeks-vercel-app-nacho-2023_xxfsgl.png",
    tech: ["react", "typescript", "panda css", "next.js"],
    github: "https://github.com/joelmturner/pdx-food-weeks",
    featured: false,
    url: "https://pdx-food-weeks.vercel.app/",
  },
  {
    name: "BoochTown",
    description: "Kombucha reviews and ratings web app using SvelteKit and Panda CSS.",
    imageURL: "boochtown-product-view_gzd9mn",
    tech: ["typescript", 'svelte', 'panda css'],
    github: "https://github.com/joelmturner/boochtown",
    featured: false,
    url: "https://boochtown.com/",
  },
];

export const ILLUSTRATION_FILTER_OPTIONS: {
  value: IllustrationTag;
  label: string;
}[] = [
  { value: "joelmturner_featured", label: "Featured" },
  { value: "jmt_dorbs", label: "Cuties" },
  { value: "letterclash", label: "LetterClash" },
  { value: "handletteredabcs_2016", label: "Handlettered ABCs 2016" },
  { value: "joelmturner_abcs2017", label: "Handlettered ABCs 2017" },
  { value: "inktober2017", label: "Inktober 2017" },
  { value: "inktober2018", label: "Inktober 2018" },
  { value: "inktober2019", label: "Inktober 2019" },
  { value: "inktober2021", label: "Inktober 2021" },
  { value: "inktober2022", label: "Inktober 2022" },
  { value: "inktober2023", label: "Inktober 2023" },
];

export const NAV_LINKS = [
  { href: "about", label: "About" },
  { href: "blog", label: "Blog" },
  { href: "illustration", label: "Illustration" },
  { href: "til", label: "TIL" },
  { href: "uses", label: "Uses" },
];

export const SOCIAL_LINKS: { href: string; label: SocialIconLabel }[] = [
  {
    href: "https://www.instagram.com/joelmturner/",
    label: "Instagram",
  },
  {
    href: "https://twitter.com/joelmturner",
    label: "Twitter",
  },
  {
    href: "https://linkedin.com/in/joelmturner",
    label: "Linkedin",
  },
  {
    href: "https://github.com/joelmturner",
    label: "Github",
  },
  {
    href: "https://dev.to/joelmturner",
    label: "DEV",
  },
  {
    href: "https://mas.to/@joelmturner",
    label: "Mastodon",
  },
] as const;

export const COLUMNS_VS_DETAILS = {
  1: {
    style: "repeat(1, minmax(200px, 1fr))",
    size: "lg",
    priority: 2,
    px: 900,
  },
  2: {
    style: "repeat(2, 1fr)",
    size: "md",
    priority: 6,
    px: 600,
  },
  3: {
    style: "repeat(3, 1fr)",
    size: "sm",
    priority: 9,
    px: 400,
  },
};
