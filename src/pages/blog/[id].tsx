import { getAllPostIds, getPostData } from '../../lib/posts';
import { PostPage } from '../../components/PostPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/ErrorBoundaryFallback';

export default function Post(props) {
  return (
    <ErrorBoundary fallback={ErrorFallback as any}>
      <PostPage {...props} />
    </ErrorBoundary>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      ...postData,
      postType: 'blog',
    },
  };
}
