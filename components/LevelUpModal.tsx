import { useContext } from 'react'
import { ChallengesContext } from '@/contexts/ChallengesContext'
import styles from '@/styles/components/LevelUpModal.module.css'
import ImgCloseBtn from '@/components/ImgCloseBtn'

export function LevelUpModal () {
    const { level, closeLevelUpModal } = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <br />
                <p>Você alcançou um novo nível!</p>
                <button type="button" onClick={closeLevelUpModal}>
                    <ImgCloseBtn />
                </button>
            </div>
        </div>
    )
}