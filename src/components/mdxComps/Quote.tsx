'use client';

import { Alert } from '../Alert';

export function Quote(props) {
  return (
    <Alert
      mt={4}
      w="98%"
      bg={{ _light: 'blue.11', _dark: 'blue.4' }}
      variant="left-accent"
      status="info"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  );
}
