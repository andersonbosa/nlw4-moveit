import CheckCircle from '@/assets/check_circle.svg'
import Close from '@/assets/close.svg'
import PlayArrow from '@/assets/play_arrow.svg'
import { CountdownContext } from '@/contexts/CountdownContext'
import styles from '@/styles/components/Countdown.module.css'
import Image from 'next/image'
import { useContext } from 'react'

export function Countdown () {
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCoundown,
        resetCountdown
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <Image priority src={CheckCircle} alt="check circle" />
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar Ciclo
                            <Image priority src={Close} alt="Close" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.countdownButton}
                            onClick={startCoundown}
                        >
                            Iníciar Ciclo
                            <Image priority src={PlayArrow} alt="PlayArrow" />
                        </button>
                    )}
                </>
            )}
        </div>
    )
}