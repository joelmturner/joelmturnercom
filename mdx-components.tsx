import type { MDXComponents } from 'mdx/types';
import { CustomHeading } from 'src/components/mdxComps/CustomHeading';
import { CustomLink } from 'src/components/mdxComps/CustomLink';
import { Heading } from 'src/components/Heading';
import { Text } from 'src/components/Text';
import { styled } from 'styled-system/jsx';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: (props: any) => <CustomHeading as="h2" size="lg" fontWeight="bold" {...props} />,
    h3: (props: any) => <CustomHeading as="h3" size="md" fontWeight="bold" {...props} />,
    h4: (props: any) => <CustomHeading as="h4" size="sm" fontWeight="bold" {...props} />,
    h5: (props: any) => <CustomHeading as="h5" size="sm" fontWeight="bold" {...props} />,
    h6: (props: any) => <CustomHeading as="h6" size="xs" fontWeight="bold" {...props} />,
    br: (props: any) => <styled.div height="24px" {...props} />,
    p: (props: any) => <Text as="p" my={6} lineHeight="tall" {...props} />,
    ul: (props: any) => <styled.div as="ul" pt={2} pl={4} ml={2} {...props} />,
    ol: (props: any) => <styled.div as="ol" pt={2} pl={4} ml={2} {...props} />,
    li: (props: any) => <styled.div as="li" pb={1} {...props} />,
    a: CustomLink,
    Link: CustomLink,
    ...components,
  };
}
