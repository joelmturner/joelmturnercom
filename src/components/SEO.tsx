import React, { memo } from 'react';
import Head from 'next/head';
import { Schema } from './Schema';

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

  return (
    <>
      <Head>
        <html lang="en"></html>
        <title>{`${title} | Joel M Turner`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={metaDescription} />
        <meta property="twitter:image:alt" content={imageAlt} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@joelmturner" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta name="image" content={metaImage} />
        <meta name="keywords" content={metaKeywords.join(', ')} />
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
