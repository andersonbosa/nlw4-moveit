/* will repeat on all pages */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>move.it | Início</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
