'use client'


import { ChallengesContext } from '@/contexts/ChallengesContext'
import styles from '@/styles/pages/Challenges.module.css'
import { useContext } from 'react'
import ImgReset from './ImgReset'

export default function ChallengesPageBtnOptions () {
  const { resetChallengesHistory } = useContext(ChallengesContext)


  return (
    <>
      <section className={styles.buttonsContainer}>
        <button
          className={styles.resetBtn}
          type="button"
          onClick={resetChallengesHistory}
        >
          <ImgReset />Reiniciar
        </button>
      </section>
    </>
  )
}