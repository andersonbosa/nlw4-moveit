'use client'

import { motion } from 'framer-motion'
import { RiErrorWarningLine } from 'react-icons/ri'

import { Sidebar } from '@/components/Sidebar'
import { ChallengeFinishedProps, ChallengesContext, ChallengesProvider } from '@/contexts/ChallengesContext'
import { UserProvider } from '@/contexts/UserContext'

import styles from '@/styles/pages/Challenges.module.css'

import { useContext } from 'react'
import ChallengesPageBtnOptions from './ChallengesPageBtnOptions'
import { Profile } from './Profile'

export interface ChallengePageProps {
  props: {
    level: number
    currentExperience: number
    challengesCompleted: number
    challengesFinished: Array<ChallengeFinishedProps>
  }
}

export default function ChallengesPageComp ({ props }: ChallengePageProps) {
  const {
    level,
    currentExperience,
    challengesCompleted,
    challengesFinished,
  } = props

  return (
    <>
      <ChallengesProvider
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
        challengesFinished={challengesFinished}
      >
        <UserProvider>
          <div className={styles.containerChallenges}>

            <Sidebar />

            <header>
              <h1>Últimos Desafios</h1>

              <section className={styles.header}>
                <ChallengesPageBtnOptions />

                <Profile />
              </section>
            </header>

            <br />

            <section>
              {
                challengesFinished.length > 0 ? (
                  <table>
                    <thead>
                      <motion.tr
                        variants={{
                          show: { opacity: 1, y: '0' },
                          hidden: { opacity: 0, y: '-50%' },
                        }}
                        initial="hidden"
                        animate="show"
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <td>Nivel</td>
                        <td>Desafio</td>
                        <td>Tipo</td>
                        <td>Experiência</td>
                      </motion.tr>
                    </thead>
                    <tbody>
                      {
                        challengesFinished.map((item, index) => (
                          <motion.tr
                            key={index}
                            variants={{
                              show: { opacity: 1, y: '0' },
                              hidden: { opacity: 0, y: `-50%` },
                            }}
                            initial="hidden"
                            animate="show"
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                          >
                            <td>{item.level}</td>
                            <td className={styles.description}>
                              <img src={`icons/${item.type}.svg`} alt="Body icon" />
                              <p>{item.description}</p>
                            </td>
                            <td>{item.type}</td>
                            <td>
                              <span>{item.amount}</span> xp
                            </td>
                          </motion.tr>
                        ))
                      }
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.alert}>
                    <RiErrorWarningLine />
                    <p>Você não completou nenhum desafio ainda!</p>
                  </div>
                )
              }
            </section>
          </div>
        </UserProvider>
      </ChallengesProvider>
    </>
  )
}