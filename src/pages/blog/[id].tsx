import { getAllPostIds, getPostData } from '../../lib/posts';
import { PostPage } from '../../components/PostPage';

export default PostPage;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let postData;
  try {
    postData = await getPostData(params.id);
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...postData,
      postType: 'blog',
    },
  };
}
