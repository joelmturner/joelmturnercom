---
title: WebAwesome and Tailwind v4 in the same site
date: 2025-12-20T16:14:07.822Z
lastmod: 2025-12-20T16:14:07.822Z
type: blog
slug: webawesome-tailwind-4-same-site
description: Using Web Awesome web components in a Tailwind v4 site
excerpt: Using Web Awesome web components in a Tailwind v4 site
tags:
  - web components
  - styling
categories: dev
cover: Posts/wa-tailwind
---

I recently moved from [Panda](https://panda-css.com/) to [Tailwind](https://tailwindcss.com/) v4 for this site and for the most part it was a smooth transition. The only friction I hit was with the [Web Awesome](https://webawesome.com/) components that I was using.

## Web Awesome

The components from Web Awesome are a great way to get functionality into a site with some style. There were a few issues I ran into that are now mostly solved via configuration, I just needed to learn where to make these tweaks.

### Native styles

Web Awesome has a way to style the rest of your project so that it matches their component styles. This is a great feature but it does conflict with Tailwind so it's good to turn that off in your Web Awesome project settings. As far as I know, this only works if you're loading from the CDN, not if you're using the npm package.

This should load just the web components that you'll use on the site.

### Revert styles

Some of the issues were from overlapping styles due to shared css layers. This next bit helped remove some of the overlap so the buttons and dropdowns worked correctly.

```css
@layer base {
  :state(wa-defined) {
    all: revert-layer;
  }
}
```

After that, I added some overrides in the Web Awesome css variables to match my themes and now everything is now pretty smooth.
