import Link from 'next/link';
import { Text } from '../Text';
import { css } from 'styled-system/css';

export function CustomLink(props: any) {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} passHref {...props}>
        <Text
          as="span"
          color={{ _light: 'brand.400', _dark: 'brand.600' }}
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {props.children}
        </Text>
      </Link>
    );
  }

  return (
    <Link className={css({ color: { _light: 'brand.400', _dark: 'brand.600' } })} {...props} />
  );
}
