import { ChallengeBox } from '@/components/ChallengeBox'
import { CompletedChallenges } from '@/components/CompletedChallenges'
import { Countdown } from '@/components/Countdown'
import { ExperienceBar } from '@/components/ExperienceBar'
import { Profile } from '@/components/Profile'
import { ChallengesContextProvider } from '@/contexts/ChallengesContext'
import { CountdownContextProvider } from '@/contexts/CountdownContext'
import styles from '@/styles/pages/Home.module.css'


interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home () {
  return (
    <>
      <ChallengesContextProvider>
        <CountdownContextProvider>
          <div className={styles.container}>
            <ExperienceBar />

            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </div>
        </CountdownContextProvider>
      </ChallengesContextProvider>
    </>
  )
}
