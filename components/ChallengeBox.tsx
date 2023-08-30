import { ChallengesContext } from '@/contexts/ChallengesContext'
import { CountdownContext } from '@/contexts/CountdownContext'
import styles from '@/styles/components/ChallengeBox.module.css'
import { useContext } from 'react'
import ImgLvlUp from './ImgLvlUp'

export function ChallengeBox () {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded () {
        completeChallenge()
        resetCountdown()
    }

    function handleChallengeFailed () {
        resetChallenge()
        resetCountdown()
    }

    console.log('activeChallenge: ', activeChallenge)
    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p> {activeChallenge.description}</p>
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
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <ImgLvlUp />
                        Avance de level completando desafios.
                    </p>
                </div>
            )}
        </div>
    )
}