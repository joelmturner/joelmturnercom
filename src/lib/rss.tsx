import * as ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { Feed } from 'feed';
import { bundleContent, getPosts } from './posts';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '../components/MDXComponents';
import { MDXLayoutRenderer } from '../components/MDXLayoutRenderer';
import { bundleMDX } from 'mdx-bundler';

export async function generateRssFeed() {
  const posts = getPosts();
  const siteURL = 'https://joelmturner.com';
  const date = new Date();
  const author = {
    name: 'Joel M Turner',
    link: 'https://twitter.com/joelmturner',
  };
  const feed = new Feed({
    title: 'Joel M Turner blog',
    description: '',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon-32x32.png`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Joel M Turner`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });

  // loop over posts for async processing
  for (const post of posts) {
    const url = `${siteURL}/blog/${post.slug}`;
    const content = await bundleContent(post);
    const mdx = (
      <MDXProvider components={MDXComponents}>
        <MDXLayoutRenderer mdxSource={content.code} />
      </MDXProvider>
    );
    const html = ReactDOMServer.renderToStaticMarkup(mdx);
    const postText = `<p><em>(The post <a href="${siteURL}/blog/${post.slug}">${post.title}</a> appeared first on <a href="${siteURL}">Joel M Turner Blog</a>.)</em></p>`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: postText + html,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  }

  //   posts.forEach((post) => {

  //   });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
