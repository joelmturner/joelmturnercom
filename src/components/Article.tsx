'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import dynamic from 'next/dynamic';
import { MDXComponents } from './MDXComponents';
import { MDX } from 'contentlayer/generated';

export function Article({ body }: { body: MDX }) {
  const MDXContent = useMDXComponent(body.code);

  //   dynamic import because not ESM compatible
  const embeds = dynamic(() => import('mdx-embed') as any);
  const { CodePen, CodeSandbox, YouTube } = embeds as any;

  const components = {
    CodePen,
    CodeSandbox,
    YouTube,
    ...MDXComponents,
  };

  return <MDXContent components={components} />;
}
