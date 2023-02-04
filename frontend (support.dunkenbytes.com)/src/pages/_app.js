import Head from "next/head";
import 'antd/dist/reset.css';
import "../app/styles/globals.css"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Support | Drunken Bytes</title>
        <meta charSet="UTF-8" />
        <meta name="author" content="Akshat Gadodia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
