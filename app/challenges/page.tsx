import ChallengesPageComp from '@/components/ChallengesPageComp'
import Head from 'next/head'
import { getChallengeProps } from '../home/page'


export default async function ChallengesPage () {
  const challProps = await getChallengeProps()

  return (
    <>
      <Head>
        <title>Move.it | Desafios</title>
        <meta name="title" content="Move.it | Desafios" />
        <meta name="description" content="Move.it | Seus desafios concluídos" />
      </Head>

      <ChallengesPageComp props={challProps} />
    </>
  )
}
