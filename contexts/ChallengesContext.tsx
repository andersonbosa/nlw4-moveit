'use client'

import challenges from '@/challenges.json'
import { LevelUpModal } from '@/components/LevelUpModal'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengeProps {
    type: string
    description: string
    amount: number
}

interface ChallengesProviderProps {
    children: ReactNode
    level: number
    currentExperience: number
    challengesCompleted: number
    challengesFinished?: Array<ChallengeFinishedProps>
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    challengesCompleted: number
    experienceToNextLevel: number
    activeChallenge: ChallengeProps | null
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
    closeLevelUpModal: () => void
    resetChallengesHistory: () => void
}

export interface ChallengeFinishedProps {
    type: string
    amount: number
    level: number
    description: string
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider ({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level || 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0)
    const [challengesFinished, setChallengesFinished] = useState<ChallengeFinishedProps[]>(rest.challengesFinished || [])

    const [activeChallenge, setActiveChallenge] = useState<ChallengeProps | null>(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    useEffect(() => {
        Notification.requestPermission()
    }, [])


    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
        Cookies.set('challengesFinished', String(JSON.stringify(challengesFinished)))
    }, [level, currentExperience, challengesCompleted, challengesFinished])


    function levelUp () {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }


    function closeLevelUpModal () {
        setIsLevelUpModalOpen(false)
    }


    function resetChallengesHistory () {
        Cookies.set('level', String(1))
        Cookies.set('currentExperience', String(0))
        Cookies.set('challengesCompleted', String(0))
        Cookies.set('challengesFinished', String(JSON.stringify([])))

        // window.location.reload()
    }


    function startNewChallenge () {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge () {
        setActiveChallenge(null)
    }

    function completeChallenge () {
        if (!activeChallenge) {
            return
        }

        const { type, amount, description } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
        setChallengesFinished([...challengesFinished, {
            amount,
            description,
            type,
            level
        }])
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
            resetChallengesHistory
        }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}