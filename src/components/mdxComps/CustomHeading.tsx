import Link from 'next/link';
import { css } from 'styled-system/css';
import { Heading } from '../Heading';

export function CustomHeading({ id, ...props }: any) {
  return (
    <Link href={`#${id}`}>
      <Heading
        id={id}
        lineHeight={'1em'}
        mb="1em"
        mt="2em"
        className={css({
          scrollMarginTop: '10px',
          scrollSnapMargin: '10px', // Safari
        })}
        {...props}
        _hover={{
          color: { _light: 'brand.300', _dark: 'brand.500' },
          textDecoration: 'underline',
          _before: {
            content: '"#"',
            position: 'relative',
            marginLeft: '-1.4ch',
            paddingRight: '0.5ch',
            color: { _light: 'brand.300', _dark: 'brand.500' },
            textDecoration: 'none',
          },
        }}
      />
    </Link>
  );
}
