import styles from '@/styles/pages/Home.module.css'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <>
      <Head>
        <title>move.it | Início</title>
      </Head>

      <main className={styles.container}>
        <p>helloworld</p>
      </main>
    </>
  )
}
