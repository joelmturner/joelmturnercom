import { Note } from './Note';
import { Heading } from './Heading';
import { Text } from './Text';
import { CustomHeading } from './mdxComps/CustomHeading';
import { CustomLink } from './mdxComps/CustomLink';
import { CustomImage } from './mdxComps/CustomImage';
import { Flex, styled } from 'styled-system/jsx';
import { Quote } from './mdxComps/Quote';
import { CodeBlock } from './mdxComps/CodeBlock';

export const MDXComponents = {
  h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props: any) => <CustomHeading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props: any) => <CustomHeading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props: any) => <CustomHeading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props: any) => <CustomHeading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props: any) => <CustomHeading as="h6" size="xs" fontWeight="bold" {...props} />,
  br: (props: any) => <styled.br height="24px" {...props} />,
  p: (props: any) => <Text as="p" my={6} lineHeight="tall" {...props} />,
  ul: (props: any) => <styled.ul pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <styled.ol pt={2} pl={4} ml={2} {...props} />,
  li: (props: any) => <styled.li pb={1} {...props} />,
  blockquote: Quote,
  img: CustomImage,
  hr: (props) => <styled.hr borderColor="border.muted" my={4} w="100%" {...props} />,
  a: CustomLink,
  Link: CustomLink,
  code: CodeBlock,
  Note,
  Flex: (props) => <Flex {...props} />,
};
