import Link from 'next/link';
import { slugify } from '../utils/utils';
import { Badge } from './Badge';
import { Flex } from 'styled-system/jsx';

type PostTagsProps = {
  tags: Array<string>;
  marginTop?: number;
  size?: any;
  postType?: 'blog' | 'til';
};

export function PostTags({ marginTop, tags, size = 'sm', postType = 'blog' }: PostTagsProps) {
  return (
    <Flex marginTop={marginTop} gap={1} wrap="wrap">
      {tags.map((tag) => {
        return (
          <Badge
            size={{ base: 'md', lg: 'sm' }}
            variant="subtle"
            background={{ _light: 'accent.2', _dark: 'iris.3' }}
            color={{ _light: 'brand.300', _dark: 'brand.500' }}
            key={tag}
          >
            <Link href={`/${postType}/tag/${slugify(tag)}`}>{tag}</Link>
          </Badge>
        );
      })}
    </Flex>
  );
}
