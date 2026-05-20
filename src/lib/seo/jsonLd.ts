import { SITE_DESCRIPTION, SITE_TITLE } from "@lib/site";

export type JsonLdObject = Record<string, unknown>;

const SCHEMA_CONTEXT = "https://schema.org";
const SITE_URL = "https://joelmturner.com";

function truncateDescription(description: string, max = 500): string {
  return description.substring(0, max);
}

function resolveCloudinaryImageUrl(cover: string): string {
  return cover.startsWith("http")
    ? cover
    : `https://res.cloudinary.com/joelmturner/image/upload/${cover}`;
}

export type ArticlePostingInput = {
  site: URL | undefined;
  collectionPath: "/blog/" | "/til/";
  schemaType?: "BlogPosting" | "Article";
  slug: string;
  title: string;
  description?: string;
  date?: Date;
  lastmod?: Date;
  cover?: string;
  tags?: string[];
  categories?: string;
};

export function articlePostingSchema(input: ArticlePostingInput): JsonLdObject {
  const {
    site,
    collectionPath,
    schemaType = "BlogPosting",
    slug,
    title,
    description = "",
    date,
    lastmod,
    cover,
    tags,
    categories,
  } = input;

  const canonicalUrl = new URL(`${collectionPath}${slug}/`, site);
  const fallbackImage = site ? new URL("/favicon-32x32.png", site).href : "";
  const imageUrl = cover ? resolveCloudinaryImageUrl(cover) : fallbackImage;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": schemaType,
    headline: title || "",
    url: canonicalUrl.toString(),
    description: truncateDescription(description),
    ...(date && { datePublished: date.toISOString() }),
    ...(lastmod || date
      ? { dateModified: (lastmod ?? date)?.toISOString() }
      : {}),
    author: {
      "@type": "Person",
      name: SITE_TITLE,
      url: site?.toString() || "",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      logo: {
        "@type": "ImageObject",
        url: site ? new URL("/favicon-32x32.png", site).href : "",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl.toString(),
    },
    ...(tags && tags.length > 0 && { keywords: tags.join(", ") }),
    ...(categories && { articleSection: categories }),
    ...(cover
      ? {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 770,
            height: 415,
          },
        }
      : { image: imageUrl }),
  };
}

export type YoutubeVideoInput = {
  title: string;
  description?: string;
  youtubeId: string;
  date?: Date;
  uploadDate?: Date;
  duration?: string;
};

export function youtubeVideoObjectSchema(
  input: YoutubeVideoInput,
): JsonLdObject {
  const {
    title,
    description = "",
    youtubeId,
    date,
    uploadDate,
    duration,
  } = input;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "VideoObject",
    name: title || "",
    description: truncateDescription(description),
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    ...(uploadDate || date
      ? { uploadDate: (uploadDate ?? date)?.toISOString() }
      : {}),
    ...(duration ? { duration } : {}),
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  };
}

export function personSchema(siteUrl = SITE_URL): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Person",
    name: SITE_TITLE,
    url: siteUrl,
    sameAs: [
      "https://bsky.app/profile/joelmturner.com",
      "https://www.instagram.com/joelmturner/",
      "https://www.linkedin.com/in/joelmturner",
      "https://github.com/joelmturner",
    ],
    jobTitle: "Senior Product Engineer",
    worksFor: { "@type": "Organization", name: "Homeworks" },
    description: SITE_DESCRIPTION,
  };
}

export function websiteSchema(siteUrl = SITE_URL): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: SITE_TITLE,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    author: { "@type": "Person", name: SITE_TITLE },
  };
}
