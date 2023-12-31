import Head from 'next/head'
import React, { useState } from 'react';
import { Ysabeau } from 'next/font/google'

import NavBar from '@/components/NavBar';

import '@/styles/globals.css'

const ysabeau = Ysabeau({
  subsets: ["latin"],
  weight: ["100", "300", "600"]
});

export const AppContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className={ysabeau.className}>
        <Head>
          <meta name="description" content="Admin panel for point of sale system." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header>
          <NavBar />
        </header>
        <Component {...pageProps} />
      </div>
    </AppContext.Provider>
  );
}