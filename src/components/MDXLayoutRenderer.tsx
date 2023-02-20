import { MDXComponents } from './MDXComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';

export const MDXLayoutRenderer = ({ mdxSource, ...rest }: any): JSX.Element => {
  const MDXContent = useMDXComponent(mdxSource.body.code);

  return <MDXContent components={MDXComponents} {...rest} />;
};
