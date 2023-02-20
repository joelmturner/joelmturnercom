import Head from 'next/head';
import { MDXComponents } from '../../components/MDXComponents';
import { PostList } from '../../components/PostList';
import { InferGetStaticPropsType } from 'next';
import { getAllPostsSorted } from '../../lib/posts';
import SEO from '../../components/SEO';
import _pick from 'lodash/pick';

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
  const tils = getAllPostsSorted('til');
  const truncatedPosts = tils.map((post) =>
    _pick(post, 'title', 'slug', 'cover', 'date', 'category', 'tags', 'excerpt')
  );
  return {
    props: {
      tils: truncatedPosts,
    },
  };
}
