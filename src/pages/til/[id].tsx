import { getAllTilIds, getTilData } from '../../lib/tils';
import { PostPage } from '../../components/PostPage';

export default PostPage;

export async function getStaticPaths() {
  const paths = getAllTilIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let postData;
  try {
    postData = await getTilData(params.id);
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
