import { HStack, SpaceProps, Tag, TagProps } from "@chakra-ui/react";

type PostTagsProps = {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
  size?: TagProps["size"];
};

export function PostTags({ marginTop, tags, size = "sm" }: PostTagsProps) {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={size} variant="subtle" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
}
