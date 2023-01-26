import Head from 'next/head';
import { MDXComponents } from '../../components/MDXComponents';
import { PostList } from '../../components/PostList';
import { InferGetStaticPropsType } from 'next';
import { getPosts } from '../../lib/posts';
import SEO from '../../components/SEO';

export default function TILIndex({ tils }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Today I Learned | Joel M Turner</title>
      </Head>
      <SEO title="Today I Learned" description="Things I learning in the dev world." />
      <MDXComponents.h1>Things I'm Curious About</MDXComponents.h1>
      <PostList posts={tils} root="til" />
    </>
  );
}

export async function getStaticProps() {
  const tils = getPosts('til');

  return {
    props: {
      tils,
    },
  };
}
