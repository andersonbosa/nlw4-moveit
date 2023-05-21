import { ChallengesContext } from '@/contexts/ChallengesContext'
import { CountdownContext } from '@/contexts/CountdownContext'
import styles from '@/styles/components/Countdown.module.css'
import { useContext, useEffect, useState } from 'react'



export function Countdown () {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext)

  /* NOTE This is a specific format to LAYOUT, not bussiness logic */
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <>
      <div>
        <div className={styles.countdown}>
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

        {
          /* TODO: make separated buttons */
          hasFinished ?
            (
              <button
                disabled
                className={styles.startCycleButton}
              >
                Ciclo encerrado
              </button>
            ) :
            (
              isActive ? (
                <button
                  type="button"
                  className={`${styles.startCycleButton} ${styles.startCycleButtonActive}`}
                  onClick={resetCountdown}
                >
                  Abandonar ciclo
                </button>
              ) :
                (
                  <button
                    type="button"
                    className={styles.startCycleButton}
                    onClick={startCountdown}
                  >
                    Iniciar um ciclo
                  </button>
                )
            )
        }
      </div>
    </>
  )
}
