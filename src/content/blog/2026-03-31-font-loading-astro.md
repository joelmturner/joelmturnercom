---
title: Loading Fonts in Astro
description: The first-party way to load fonts in Astro for best performance.
date: 2026-03-31
lastmod: 2026-03-31
categories: dev
tags:
- Astro
- optimization
- fonts
slug: astro-font-loading
video.youtubeId: ''
cover: https://res.cloudinary.com/joelmturner/image/upload/v1777391038/astro_font_optimization_part_2_f0s49c.jpg
---

Astro has just added first-party support for loading fonts in a performant way. Until recently we [loaded fonts using the Astro Font](/blog/astro-font-optimization/) package to load the fonts. Now, we have a first-party way of loading the fonts.

## Using a custom font
You can load a local font or from a provider with a quick update to the `astro.config.mjs`.

### From a local file

```js title="astro.config.mjs"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [{
    provider: fontProviders.local(),
    name: "SweetCandy",
    cssVariable: "--font-sweet-candy",
    options: {
      variants: [{
        src: ['./src/assets/fonts/SweetCandy.woff2'],
        weight: 'normal',
        style: 'normal'
      }]
    }
  }]
});
```

### From a Provider

```js title="astro.config.mjs"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Roboto",
    cssVariable: "--font-roboto",
  }]
});
```

## Using the font
Now that we have the font configured we can add this to our site for use. A great way to do this is in our layout component's `head` section. 

```astro title="src/layouts/Layout.astro"
---
import { Font } from "astro:assets";
---

<html>
  <head>
    <Font cssVariable="--font-sweet-candy" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

Once that's in place, any page that uses that head will be able to grab the css variable and apply it wherever needed. 

```astro title="src/pages/candyMachine.astro"
---
import Layout from "../layouts/Layout.astro";
---
<Layout>
  <h1>In a world...</h1>

  <p>The great Candy Queen has given the people a new...</p>

  <style>
  h1 {
    font-family: var(--font-sweet-candy);
  }
  </style>
</Layout>
```

## Optimization
It's sometimes necessary to have a font preloaded, especially if that font is largely above the fold. The one caveat here is that it can slow the rendering of the page since it's a blocking request so it's best to use it only if needed. In this case, we can add the `preload` attribute to the Font loading in the head. 

```astro
<Font cssVariable="--font-sweet-candy" preload />
```

## Tailwind
I'm currently using Tailwind v4 on this site and it can use the variable as well. 

```css title="src/style/global.css"
@theme inline {
  --font-family-fira-code: var(--font-fira-code);
  --font-family-fira-sans: var(--font-fira-sans);
}
```