import { getAllTilIds, getTilData } from "../../lib/tils";
import { PostPage } from "../../components/PostPage";

export default PostPage;

export async function getStaticPaths() {
  const paths = getAllTilIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getTilData(params.id);

  return {
    props: {
      ...postData,
      postType: "til",
    },
  };
}
