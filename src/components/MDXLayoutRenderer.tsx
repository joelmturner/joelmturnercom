import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { MDXComponents } from './MDXComponents';

export const MDXLayoutRenderer = ({ mdxSource, ...rest }: any): JSX.Element => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout components={MDXComponents} {...rest} />;
};
