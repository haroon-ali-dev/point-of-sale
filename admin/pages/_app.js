import Head from 'next/head'
import { Ysabeau } from 'next/font/google'

import '@/styles/globals.css'

const ysabeau = Ysabeau({
  subsets: ["latin"],
  weight: ["100", "300", "600"]
});


export default function App({ Component, pageProps }) {
  return (
    <div className={ysabeau.className}>
      <Head>
        <meta name="description" content="Admin panel for point of sale system." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
