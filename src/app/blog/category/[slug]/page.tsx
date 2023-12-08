import { getAllPostsByCategory, getAllCategories } from '~/lib/posts';
import { BlogArchive } from '@components/BlogArchive';
import { slugify } from '../../../../utils/utils';
import { Blog } from 'contentlayer/generated';

export default async function CategoryArchive({ params }) {
  const posts = await getPostData(params.slug);
  return <BlogArchive posts={posts} title={`Category: ${params.slug}`} />;
}

async function getPostData(slug: string): Promise<Blog[]> {
  const posts = getAllPostsByCategory(slugify(slug)) as Blog[];
  return posts;
}

export async function generateStaticParams() {
  return getAllCategories();
}

export async function generateMetadata({ params }) {
  const title = `Category: ${params.slug}`;

  return {
    title,
    description: `Posts about ${params.slug}`,
    metadataBase: new URL(`https://joelmturner.com`),
    alternates: {
      canonical: `https://joelmturner.com/blog/category/${params.slug}`,
    },
    category: params.slug,
    openGraph: {
      title,
      description: `Posts about ${params.slug}`,
      url: `https://joelmturner.com/blog/category/${params.slug}`,
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
