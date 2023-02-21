import { PostPage } from '../../components/PostPage';
import { getAllPostIds, getPostBySlug } from '../../lib/posts';

export default PostPage;

export async function getStaticPaths() {
  const paths = getAllPostIds('til');
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let postData;
  try {
    postData = getPostBySlug(params.id, 'til');
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...postData,
      postType: 'til',
    },
  };
}
