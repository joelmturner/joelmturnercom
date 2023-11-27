import { styled } from 'styled-system/jsx';
import { Blog } from 'contentlayer/generated';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { PostTags } from './PostTags';
import { Heading } from './Heading';
import { Text } from './Text';
import { Image } from './mdxComps/Image';
import { token } from 'styled-system/tokens';
import { css } from 'styled-system/css';

export function FeaturedPost({ post }: { post: Blog }) {
  return (
    <styled.div
      marginTop={{ base: '1', sm: '5' }}
      display="flex"
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
    >
      <styled.div display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
        {post.cover ? (
          <styled.div
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%"
          >
            <Link href={`/blog/${post.slug}`}>
              <styled.div borderRadius="lg" overflow="hidden">
                <Image
                  width={300 * 1.5}
                  height={190 * 1.5}
                  src={post.cover}
                  alt="some good alt text"
                />
              </styled.div>
            </Link>
          </styled.div>
        ) : null}
        <styled.div zIndex="1" width="100%" position="absolute" height="100%">
          <div
            className={css({
              // using pattern from  https://panda-css.com/docs/guides/dynamic-styling#using-tokenvar
              background: {
                _light: `var(--color-dot-light)`,
                _dark: `var(--color-dot-dark)`,
              },
              opacity: '0.6',
              height: 'full',
            })}
            style={
              {
                '--color-dot-light': `radial-gradient(${token.var(
                  'colors.orange.9'
                )} 1px, transparent 1px)` as any,
                '--color-dot-dark': `radial-gradient(${token.var(
                  'colors.sky.9'
                )} 1px, transparent 1px)` as any,
                backgroundSize: '20px 20px',
              } as any
            }
          />
        </styled.div>
      </styled.div>
      <styled.div
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}
      >
        <PostTags tags={post.tags} size="md" />
        <Heading marginTop="1">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <Text as="p" marginTop="2" color="fg.muted" fontSize="lg">
          {post.excerpt}
        </Text>
      </styled.div>
    </styled.div>
  );
}
