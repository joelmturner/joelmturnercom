import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
                    partytown = {
                        lib: "/_next/static/~partytown/",
                        forward: ["gtag"]           
                    };
                `,
            }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={'dark'} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
