'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContext } from "./ChallengesContext"

interface CountdownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCoundown: () => void
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode
}

const INITIAL_TIME_IN_MINUTES = 25
const INITIAL_COUNTDOWN_IN_MINUTES = INITIAL_TIME_IN_MINUTES * 60

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout

export function CountdownProvider ({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(INITIAL_COUNTDOWN_IN_MINUTES)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCoundown () {
        setIsActive(true)
    }

    function resetCountdown () {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)
        setTime(INITIAL_COUNTDOWN_IN_MINUTES)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCoundown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
