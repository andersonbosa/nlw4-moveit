'use client'

import { motion } from 'framer-motion'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ChallengeBox } from '@/components/ChallengeBox'
import { CompletedChallenges } from '@/components/CompletedChallenges'
import { Countdown } from '@/components/Countdown'
import { ExperienceBar } from '@/components/ExperienceBar'
import { Profile } from '@/components/Profile'
import { Sidebar } from '@/components/Sidebar'

import { ChallengesProvider } from '@/contexts/ChallengesContext'
import { CountdownProvider } from '@/contexts/CountdownContext'
import { UserProvider } from '@/contexts/UserContext'
import styles from '@/styles/pages/Home.module.css'
import { ChallengePageProps } from './ChallengesPageComp'

export default function HomePageComp ({ props }: ChallengePageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    () => {
      const storage = localStorage.getItem('login')

      if (storage) {
        setIsLoading(false)
      } else {
        router.replace('/')
      }
    },
    [router]
  )

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      challengesFinished={props.challengesFinished}

    >
      <UserProvider>
        {!isLoading && (
          <div className={styles.container}>
            <Sidebar />

            <ExperienceBar />

            <CountdownProvider>
              <motion.section
                variants={{
                  show: { opacity: 1, x: '0' },
                  hidden: { opacity: 0, x: '-50%' },
                }}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <motion.div
                  variants={{
                    show: { opacity: 1, x: '0' },
                    hidden: { opacity: 0, x: '50%' },
                  }}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                  <ChallengeBox />
                </motion.div>
              </motion.section>
            </CountdownProvider>
          </div>
        )}
      </UserProvider>
    </ChallengesProvider>
  )
}
