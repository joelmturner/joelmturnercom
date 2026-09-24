// default site title and meta description (nav/projects live in constants.ts)

export const SITE_TITLE = 'Joel M Turner'
export const SITE_DESCRIPTION =
  'Senior Product Engineer in Portland. Astro/React/TypeScript blog, dev tips (TIL), illustration & zines, and side projects.'

/** full document title for homepage (used with titleFull — no "| Joel M Turner" suffix) */
export const HOME_TITLE =
  'Joel M Turner — Web Dev Blog, Illustration & Projects'

/** Cloudinary public id for homepage OG/social preview */
export const HOME_OG_IMAGE = 'joel-turner_nobg'

/** blog index page title (suffix added by BaseHead) */
export const BLOG_TITLE = 'Web Dev Blog: Astro, React & TypeScript'

/** blog index OG image — matches the page description, not the illustrator card */
export const BLOG_OG_IMAGE =
  'https://res.cloudinary.com/joelmturner/image/upload/h_630,w_1200/c_fit,h_400,l_text:Helvetica_80_bold_line_spacing_20:Web%20Dev%20Blog%3A%20Astro%2C%20React%20%26%20TypeScript,w_700/fl_layer_apply,g_west,x_400,y_0/blog-post-card.png'

export const RSS_FEED_PATH = '/rss.xml'
