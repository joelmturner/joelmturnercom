import { styled } from '../../../styled-system/jsx';
import { Code } from '../Code';

export function CodeBlock(props) {
  if (!props.className) {
    // inline code
    return (
      <Code
        background={{ _light: 'accent.2', _dark: 'iris.3' }}
        color={{ _light: 'brand.400', _dark: 'brand.500' }}
        fontStyle="italic"
        fontSize="0.84em"
        {...props}
      />
    );
  }

  const { filename, line, ...rest } = props;

  return (
    <styled.code
      data-filename={filename}
      display="block"
      border="1px solid"
      borderColor={{
        _light: 'accent.5',
        _dark: 'slate.4',
      }}
      fontSize="0.84em"
      w="100%"
      overflowX="auto"
      py={2}
      my={4}
      background={{ _light: 'accent.2', _dark: 'iris.2' }}
      css={{
        '&[data-filename]::before': {
          content: 'attr(data-filename)',
          padding: 2,
          background: { _light: 'accent.5', _dark: 'slate.4' },
          display: 'block',
          fontSize: 'smaller',
          marginBottom: '0.5rem',
        },
        '&[data-filename]': {
          paddingTop: 0,
        },
        '& .highlight-line': {
          position: 'relative',
          pl: 8,
          pr: 2,

          '&::before': {
            content: 'attr(data-line)',
            position: 'absolute',
            top: 0,
            left: 1,
            color: 'border.default',
          },
        },
      }}
      {...rest}
    />
  );
}
