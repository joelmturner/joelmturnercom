import Head from 'next/head';

export function Meta({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content="react native, blog, John Doe, tutorial, react navigation" />
    </Head>
  );
}
