import Head from "next/head";
import { getTILs } from "../../lib/tils";
import { MDXComponents } from "../../src/components/MDXComponents";
import { PostList } from "../../src/components/PostList";

export default function TILIndex({ tils }) {
  return (
    <>
      <Head>
        <title>Today I Learned | Joel M Turner</title>
      </Head>
      <MDXComponents.h1>Things I'm Curious About</MDXComponents.h1>
      <PostList posts={tils} root="til" />
    </>
  );
}

export async function getStaticProps({}) {
  const tils = getTILs();

  return {
    props: {
      tils,
    },
  };
}
