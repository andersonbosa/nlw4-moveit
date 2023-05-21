import { ChallengesContext } from '@/contexts/ChallengesContext'
import { CountdownContext } from '@/contexts/CountdownContext'
import styles from '@/styles/components/ChallengeBox.module.css'
import { useContext } from 'react'

export function ChallengeBox () {
  const {
    activeChallenge,
    resetChallenge,
    completeChallenge
  } = useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeScceeded () {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed () {
    resetChallenge()
    resetCountdown()
  }

  return (
    <>
      <div className={styles.challengeContainer}>
        {
          activeChallenge ?
            (
              <>
                <div className={styles.challengeActive}>
                  <header>Ganhe {activeChallenge.amount} xp</header>
                  <main>
                    {/* TODO: refactor that image representation */}
                    <img src={`icons/${activeChallenge.type}.svg`} alt="Challenge type" />
                    <strong>Novo  desafio</strong>
                    <p>{activeChallenge.description}</p>
                  </main>
                  <footer>
                    <button
                      type="button"
                      className={styles.challengeFailedButton}
                      onClick={handleChallengeFailed}
                    >
                      Falhei
                    </button>
                    <button
                      type="button"
                      className={styles.challengeSucceededButton}
                      onClick={handleChallengeScceeded}
                    >
                      Completei
                    </button>
                  </footer>
                </div>
              </>
            ) :
            (
              <>
                <div className={styles.challengeNotActive}>
                  <strong>Finalize um ciclo para receber um desafio</strong>
                  <p>
                    <img src="icons/level-up.svg" alt="Level up" />
                    Avance de level completando desafios.
                  </p>
                </div>
              </>
            )
        }
      </div>
    </>
  )
}