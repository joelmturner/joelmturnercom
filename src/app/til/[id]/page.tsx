import { getAllPostIds, getPostBySlug } from '~/lib/posts';
import { PostPage } from '@components/PostPage';

export default async function PostPageRenderer({ params }) {
  const postData = await getPostData(params.id);
  return <PostPage {...postData} postType="til" />;
}

export async function getPostData(id: string): Promise<ReturnType<typeof getPostBySlug>> {
  const postData = getPostBySlug(id, 'til');

  return postData;
}

export async function getStaticParams() {
  const paths = getAllPostIds('til');
  return {
    paths,
    fallback: false,
  };
}

export async function generateMetadata({ params }) {
  const postData = await getPostData(params);

  const title = postData.title;

  return {
    title,
    description: postData.excerpt,
    metadataBase: new URL(`https://joelmturner.com`),
    alternates: {
      canonical: `https://joelmturner.com/til/${postData.slug}`,
    },
    category: postData.category,
    openGraph: {
      title,
      description: postData.description,
      url: `https://joelmturner.com/til/${postData.slug}`,
      siteName: 'Joel M Turner',
      type: 'article',
      publishedTime: `${postData.date}`,
      modifiedTime: `${postData.lastmod}`,
      images: postData.cover
        ? [
            {
              url:
                postData.cover ??
                'https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner.jpg',
              alt: postData.title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: postData.excerpt ?? postData.description,
      site: '@joelmturner',
      creator: '@joelmturner',
      images: postData.cover
        ? [
            {
              url:
                postData.cover ??
                'https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner.jpg',
              alt: postData.title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
  };
}
