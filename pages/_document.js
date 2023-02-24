import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="pianissimo" key="title"/>
        <meta property="og:description" content="song recommender" key="description"/>
        <meta
          property="og:image"
          content="https://imgur.com/KwrDil8"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
