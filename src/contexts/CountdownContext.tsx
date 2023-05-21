import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext'

let countdownTimeout: NodeJS.Timeout
// const defaultInitialTime = 25 * 60
const defaultInitialTime = 3


interface CoundownProviderProps {
  children: ReactNode
}

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  resetCountdown: () => void
  startCountdown: () => void
}


export const CountdownContext = createContext({} as CountdownContextData)
export function CountdownContextProvider ({ children }: CoundownProviderProps) {
  const { startNewChallenge, resetChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(defaultInitialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown () {
    setTime(time - 1) /* Make the countdown start rights after the user click */
    setIsActive(true)
  }

  function resetCountdown () {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(defaultInitialTime)
    setHasFinished(false)
  }

  useEffect(
    () => {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(
          () => { setTime(time - 1) },
          1000
        )
      } else if (isActive && time === 0) {
        setHasFinished(true)
        setIsActive(false)
        startNewChallenge()
      }
    },
    [isActive, time]
  )


  const sharedContextProps = {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown,
  }

  return (
    <CountdownContext.Provider value={sharedContextProps}>
      {children}
    </CountdownContext.Provider>
  )
}