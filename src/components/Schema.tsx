import Script from "next/script";
import React from "react";

type SchemaProps = {
  author: string;
  canonicalUrl: string;
  datePublished: string;
  dateModified: string;
  defaultTitle: string;
  description: string;
  image: string;
  isBlogPost: boolean;
  title: string;
  url: string;
};

export const Schema = React.memo(
  ({
    author,
    canonicalUrl,
    datePublished,
    dateModified,
    defaultTitle,
    description,
    image,
    isBlogPost,
    title,
    url,
  }: SchemaProps) => {
    const baseSchema = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url,
        name: title,
        alternateName: defaultTitle,
      },
    ];

    const schema = isBlogPost
      ? [
          ...baseSchema,
          {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": url,
                  name: title,
                  image,
                },
              },
            ],
          },
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url,
            name: title,
            alternateName: defaultTitle,
            headline: title,
            image: {
              "@type": "ImageObject",
              url: image,
            },
            description,
            author: {
              "@type": "Person",
              name: author,
            },
            publisher: {
              "@type": "Organization",
              url,
              logo: image,
              name: title,
            },
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": canonicalUrl,
            },
            datePublished,
            dateModified,
          },
        ]
      : baseSchema;

    return (
      <>
        {/* Schema.org tags */}
        <Script data-schema-org type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>
      </>
    );
  }
);
