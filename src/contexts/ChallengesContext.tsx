import { ReactNode, createContext, useState } from 'react'

export const ChallengesContext = createContext({})

const INITIAL_LEVEL = 1
const INITIAL_EXPERIENCE = 0
const INITIAL_COMPLETED_CHALLENGES = 0

interface ChallengesProviderProps {
  children: ReactNode
}

export function ChallengesProvider ({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(INITIAL_LEVEL)
  const [currentExperience, setCurrentExperience] = useState(INITIAL_EXPERIENCE)
  const [challengesCompleted, setChallengesCompleted] = useState(INITIAL_COMPLETED_CHALLENGES)

  const sharedContextValue = {
    level,
    setLevel,
    currentExperience,
    setCurrentExperience,
    challengesCompleted,
    setChallengesCompleted,
  }

  return (
    <ChallengesContext.Provider value={sharedContextValue}>
      {children}
    </ChallengesContext.Provider>
  )
}