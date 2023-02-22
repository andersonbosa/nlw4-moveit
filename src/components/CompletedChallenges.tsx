import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges () {
  const { challengesCompleted } = { challengesCompleted: 5 }

  return (
    <div className={styles.completedChallenges}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}