import { getPostBySlug, getAllPostIds } from '~/lib/posts';
import { PostPage } from '@components/PostPage';

export default async function PostPageRenderer({ params }) {
  const postData = await getPostData(params);
  return <PostPage {...postData} postType="blog" />;
}

export async function getPostData(params) {
  let postData;
  try {
    postData = getPostBySlug(params.id);
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }

  return postData;
}

export async function getStaticParams() {
  const paths = getAllPostIds();
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
      canonical: `https://joelmturner.com/blog/${postData.slug}`,
    },
    category: postData.category,
    openGraph: {
      title,
      description: postData.description,
      url: `https://joelmturner.com/blog/${postData.slug}`,
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
