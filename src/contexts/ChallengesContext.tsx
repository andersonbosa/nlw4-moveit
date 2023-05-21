import challenges from '@/../public/challenges.json'
import { ReactNode, createContext, use, useEffect, useState } from 'react'

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengeItem {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  experienceToNextLevel: number
  activeChallenge: ChallengeItem
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}


const INITIAL_LEVEL = 1
const INITIAL_EXPERIENCE = 0
const INITIAL_COMPLETED_CHALLENGES = 0
const INITIAL_ACTIVE_CHALLENGE = null // interface ChallengeItem -> precisa ser objeto vazio?
const INITIAL_CONTEXT = {} as ChallengesContextData


export const ChallengesContext = createContext(INITIAL_CONTEXT)
export function ChallengesContextProvider ({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(INITIAL_LEVEL)
  const [currentExperience, setCurrentExperience] = useState(INITIAL_EXPERIENCE)
  const [challengesCompleted, setChallengesCompleted] = useState(INITIAL_COMPLETED_CHALLENGES)
  const [activeChallenge, setActiveChallenge] = useState(INITIAL_ACTIVE_CHALLENGE)

  const experienceToNextLevel = Math.pow(((level + 1) * 4), 2)


  function levelUp () {
    setLevel(level + 1)
  }

  function startNewChallenge () {
    console.log('Starting new challenge')
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge () {
    setActiveChallenge(INITIAL_ACTIVE_CHALLENGE)
  }

  function completeChallenge () {
    if (!activeChallenge) {
      // NOTE throw?
      return
    }

    const { amount } = activeChallenge
    let finalUserExperience = currentExperience + amount

    if (finalUserExperience > experienceToNextLevel) {
      finalUserExperience = finalUserExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalUserExperience)
    setActiveChallenge(INITIAL_ACTIVE_CHALLENGE)
    setChallengesCompleted(challengesCompleted + 1)
  }

  /* NOTE: useEffect with the 2ª arg blank (the array) will execute only
   one time, when the component get rendered */
  useEffect(
    () => { window.Notification.requestPermission() },
    []
  )

  const sharedContextProps = {
    level,
    currentExperience,
    challengesCompleted,
    activeChallenge,
    experienceToNextLevel,
    levelUp,
    startNewChallenge,
    resetChallenge,
    completeChallenge
  }

  return (
    <ChallengesContext.Provider value={sharedContextProps}>
      {children}
    </ChallengesContext.Provider>
  )
}