import { ChallengesContext } from '@/contexts/ChallengesContext'
import styles from '@/styles/components/Profile.module.css'
import { useContext } from 'react'

export function Profile () {
  const { level } = useContext(ChallengesContext)

  const authorName = "Anderson Bosa"

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/andersonbosa.png" alt={authorName} />
      <div>
        <strong>{authorName}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}