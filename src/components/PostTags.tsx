import { HStack, Link, SpaceProps, Tag, TagProps, Text, useColorMode } from '@chakra-ui/react';

type PostTagsProps = {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
  size?: TagProps['size'];
};

export function PostTags({ marginTop, tags, size = 'sm' }: PostTagsProps) {
  const { colorMode } = useColorMode();
  return (
    <HStack spacing={2} marginTop={marginTop}>
      <Text fontSize="md">Tags: </Text>
      {tags.map((tag) => {
        return (
          <Tag
            size={['xs', 'sm']}
            variant="subtle"
            colorScheme={colorMode === 'light' ? 'red' : 'blue'}
            key={tag}
          >
            <Link href={`/blog/tag/${tag.toLowerCase()}`}>{tag}</Link>
          </Tag>
        );
      })}
    </HStack>
  );
}
