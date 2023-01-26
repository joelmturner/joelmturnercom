import { HStack, Link, SpaceProps, Tag, TagProps, Text, useColorMode } from '@chakra-ui/react';
import { slugify } from '../utils/utils';

type PostTagsProps = {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
  size?: TagProps['size'];
  postType: 'blog' | 'til';
};

export function PostTags({ marginTop, tags, size = 'sm', postType = 'blog' }: PostTagsProps) {
  const { colorMode } = useColorMode();
  return (
    <HStack marginTop={marginTop} gap={[1, 2]} wrap="wrap">
      <Text fontSize="md">Tags: </Text>
      {tags.map((tag) => {
        return (
          <Tag
            size={['md', 'sm']}
            variant="subtle"
            colorScheme={colorMode === 'light' ? 'red' : 'blue'}
            key={tag}
            p={[2, 0]}
          >
            <Link href={`/${postType}/tag/${slugify(tag)}`}>{tag}</Link>
          </Tag>
        );
      })}
    </HStack>
  );
}
