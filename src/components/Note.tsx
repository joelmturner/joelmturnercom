import { styled } from 'styled-system/jsx';

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <styled.div
      mb={2}
      px={3}
      pt={0.025}
      pb={0.25}
      bg={'bg.muted'}
      css={{
        borderLeftStyle: 'solid',
        borderLeftWidth: '5px',
        borderLeftColor: {
          _light: 'accent.5',
          _dark: 'brand.600',
        },
      }}
    >
      {children}
    </styled.div>
  );
}
