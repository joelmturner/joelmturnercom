<p align="center">
  <a href="https://joelmturner.com">
    <img alt="Joel M. turner" src="https://res.cloudinary.com/joelmturner/w_120,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/joel-turner.jpg" width="60" />
  </a>
</p>

# Joel M. Turner Website

This site is based on `gatsby-them-ui-blog` and uses TypeScript.

## Typing

Run `yarn type` to do a type check or `yarn type:watch` to watch the typings.

## Prettier

Run `yarn format` to format all files based on prettier and eslint.

## Cache

Run `yarn clean` to clear the Gatsby cache

## Deployment

Netlify is watching `master` for commits. As soon as a commit comes in Netlify tries to build the new version.

## Blog Post

To create a new post start a new branch named `blog/post-name` and add a folder in `./content/posts` with the slug of the post. The post content will be in `index.mdx` inside there. Point to a cover image in frontmatter in each post.

Current frontmatter keys are:

```yaml
title: string # displayed title of the post
date: string # i.e. 2019-09-07
draft: boolean # only true will publish
cover: string # image url
```

Once the post is ready for publishing start a Merge Request to master from the post branch. This way the post can be merged through any GitLab tool.

## Pages

To add a new page you can create a `.tsx` or `.mdx` in `./src/pages`. These will be automatically added a pages with the slug being the name of the page.

## GraphQL Queries

The queries are added as fragments in `./src/utils/queries.tsx` and can be used in any of the page queries.
