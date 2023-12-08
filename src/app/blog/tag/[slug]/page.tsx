import { BlogArchive } from '@components/BlogArchive';
import { getAllPostsByTag, getAllTags } from '~/lib/posts';
import { slugify } from '../../../../utils/utils';
import { Blog } from 'contentlayer/generated';

export default async function TagArchive({ params }) {
  const posts = await getPostData(params.slug);
  return <BlogArchive posts={posts} title={`Tag: ${params.slug}`} />;
}

async function getPostData(slug: string): Promise<Blog[]> {
  const posts = getAllPostsByTag(slugify(slug)) as Blog[];
  return posts;
}

export async function generateStaticParams() {
  return getAllTags();
}

export async function generateMetadata({ params }) {
  const title = `Tag: ${params.slug}`;

  return {
    title,
    description: `Posts about ${params.slug}`,
    metadataBase: new URL(`https://joelmturner.com`),
    alternates: {
      canonical: `https://joelmturner.com/blog/tag/${params.slug}`,
    },
    category: params.slug,
    openGraph: {
      title,
      description: `Posts about ${params.slug}`,
      url: `https://joelmturner.com/blog/tag/${params.slug}`,
      siteName: 'Joel M Turner',
      type: 'article',
      images: [
        {
          url: 'https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner.jpg',
          alt: 'Joel M Turner',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Posts about ${params.slug}`,
      images: {
        url: 'https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner.jpg',
        alt: 'Joel M Turner',
        width: 1200,
        height: 630,
      },
    },
  };
}
