import Head from 'next/head';
import { getTILs } from '../../lib/tils';
import { MDXComponents } from '../../components/MDXComponents';
import { PostList } from '../../components/PostList';
import { InferGetStaticPropsType } from 'next';

export default function TILIndex({ tils }: InferGetStaticPropsType<typeof getStaticProps>) {
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

export async function getStaticProps() {
  const tils = getTILs();

  return {
    props: {
      tils,
    },
  };
}
