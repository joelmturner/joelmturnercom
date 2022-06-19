import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostPage } from "../../components/PostPage";

export default PostPage;

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
      postType: "blog",
    },
  };
}
