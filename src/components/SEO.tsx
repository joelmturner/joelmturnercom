import React, { memo, useMemo } from 'react';
import Head from 'next/head';
import { Schema } from './Schema';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const BASE_URL = 'http://joelmturner.com';

const DESCRIPTION = `I'm a kombucha lovin' Front-End Dev at Sprinklr. Love lettering, love design, love development, love Portland.`;
const KEYWORDS = [
  'react',
  'reactjs',
  'javascript',
  'typescript',
  'developer',
  'css',
  'illustration',
  'sketch',
  'handlettering',
  'portland',
  'gatsby',
  'gatsbyjs',
];

type SEOProps = {
  description?: string;
  lang?: string;
  title?: string;
  image?: string; // full path to image
  imageAlt?: string;
  keywords?: string[];
  isBlogPost?: boolean;
  datePublished?: string;
  dateModified?: string;
};

function SEO({
  description,
  title = '',
  image,
  imageAlt = 'joel m turner portrait',
  isBlogPost = false,
  datePublished,
  dateModified,
  keywords,
}: SEOProps) {
  const metaDescription = description ?? DESCRIPTION;
  const metaImage = image ?? 'https://res.cloudinary.com/joelmturner/joel-turner.jpg';
  const metaKeywords = keywords ?? KEYWORDS;

  const { pathname, asPath } = useRouter();
  const url = useMemo(() => {
    return `${BASE_URL}${asPath ?? pathname}`;
  }, []);

  return (
    <>
      <NextSeo
        title={title}
        description={metaDescription}
        canonical={url}
        openGraph={{
          url,
          title,
          description: metaDescription,
          images: metaImage
            ? [
                {
                  url: metaImage,
                  alt: imageAlt,
                },
              ]
            : undefined,
          site_name: 'SiteName',
          article: {
            publishedTime: datePublished,
            modifiedTime: dateModified,
            authors: ['Joel Turner'],
            tags: metaKeywords.join(', ') as unknown as Readonly<string[]>,
          },
        }}
      />
      <Head>
        <title>{`${title} | Joel M Turner`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Schema
        isBlogPost={isBlogPost}
        url="https://joelmturner.com"
        title={title}
        image={metaImage}
        description={metaDescription}
        datePublished={datePublished || ''}
        dateModified={dateModified || ''}
        canonicalUrl="https://joelmturner.com"
        author="@joelmturner"
        defaultTitle={title}
      />
    </>
  );
}

export default memo(SEO);
