import { SITE_DESCRIPTION, SITE_TITLE } from '@lib/site'

export type JsonLdObject = Record<string, unknown>

const SCHEMA_CONTEXT = 'https://schema.org'
const SITE_URL = 'https://joelmturner.com'

function truncateDescription(description: string, max = 500): string {
  return description.substring(0, max)
}

function resolveCloudinaryImageUrl(cover: string): string {
  return cover.startsWith('http')
    ? cover
    : `https://res.cloudinary.com/joelmturner/image/upload/${cover}`
}

export type ArticlePostingInput = {
  site: URL | undefined
  collectionPath: '/blog/' | '/til/'
  schemaType?: 'BlogPosting' | 'Article'
  slug: string
  title: string
  description?: string
  date?: Date
  lastmod?: Date
  cover?: string
  tags?: string[]
  categories?: string
  authorName?: string
  authorUrl?: string
}

export function articlePostingSchema(input: ArticlePostingInput): JsonLdObject {
  const {
    site,
    collectionPath,
    schemaType = 'BlogPosting',
    slug,
    title,
    description = '',
    date,
    lastmod,
    cover,
    tags,
    categories,
    authorName = SITE_TITLE,
    authorUrl,
  } = input

  const canonicalUrl = new URL(`${collectionPath}${slug}/`, site)
  const fallbackImage = site ? new URL('/favicon-32x32.png', site).href : ''
  const imageUrl = cover ? resolveCloudinaryImageUrl(cover) : fallbackImage
  const resolvedAuthorUrl = authorUrl ?? site?.toString() ?? ''

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': schemaType,
    headline: title || '',
    url: canonicalUrl.toString(),
    description: truncateDescription(description),
    ...(date && { datePublished: date.toISOString() }),
    ...(lastmod || date
      ? { dateModified: (lastmod ?? date)?.toISOString() }
      : {}),
    author: {
      '@type': 'Person',
      name: authorName,
      url: resolvedAuthorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_TITLE,
      logo: {
        '@type': 'ImageObject',
        url: site ? new URL('/favicon-32x32.png', site).href : '',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl.toString(),
    },
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    ...(categories && { articleSection: categories }),
    ...(cover
      ? {
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: 770,
            height: 415,
          },
        }
      : { image: imageUrl }),
  }
}

export type FaqItem = {
  question: string
  answer: string
}

export function faqPageSchema(items: FaqItem[]): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export type YoutubeVideoInput = {
  title: string
  description?: string
  youtubeId: string
  date?: Date
  uploadDate?: Date
  duration?: string
}

export function youtubeVideoObjectSchema(
  input: YoutubeVideoInput,
): JsonLdObject {
  const {
    title,
    description = '',
    youtubeId,
    date,
    uploadDate,
    duration,
  } = input

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'VideoObject',
    name: title || '',
    description: truncateDescription(description),
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    ...(uploadDate || date
      ? { uploadDate: (uploadDate ?? date)?.toISOString() }
      : {}),
    ...(duration ? { duration } : {}),
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  }
}

export function personSchema(siteUrl = SITE_URL): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Person',
    name: SITE_TITLE,
    url: siteUrl,
    image:
      'https://res.cloudinary.com/joelmturner/image/upload/f_auto/q_auto/c_fill,g_faces,h_400,w_400/joel-turner_nobg',
    sameAs: [
      'https://bsky.app/profile/joelmturner.com',
      'https://www.instagram.com/joelmturner/',
      'https://www.linkedin.com/in/joelmturner',
      'https://github.com/joelmturner',
      'https://twitter.com/joelmturner',
    ],
    jobTitle: 'Senior Product Engineer',
    worksFor: { '@type': 'Organization', name: 'Homeworks' },
    description:
      'Senior Product Engineer in Portland, Oregon specializing in React, TypeScript, and Astro. Creator of dev tutorials, TIL notes, hand lettering, and zines.',
    knowsAbout: [
      'React',
      'TypeScript',
      'Astro',
      'frontend development',
      'web accessibility',
      'data visualization',
      'hand lettering',
      'illustration',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland',
      addressRegion: 'Oregon',
      addressCountry: 'US',
    },
  }
}

export function websiteSchema(siteUrl = SITE_URL): JsonLdObject {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    author: { '@type': 'Person', name: SITE_TITLE, url: siteUrl },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://joelmturner.com/blog/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
