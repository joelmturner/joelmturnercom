import * as ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { Feed } from 'feed';
import { getPosts } from './posts';

export async function generateRssFeed() {
  const posts = getPosts();
  const siteURL = 'https://joelmturner.com';
  const date = new Date();
  const author = {
    name: 'Joel M Turner',
    email: 'joel@joelmturner.com',
    link: 'https://twitter.com/joelmturner',
  };
  const feed = new Feed({
    title: 'Joel M Turner blog',
    description: '',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/jmt-logo-light.svg`,
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

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;
    const html = ReactDOMServer.renderToStaticMarkup(post.content as any);
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
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
