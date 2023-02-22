import styles from '@/styles/components/Profile.module.css'

export function Profile () {
  const authorName = "Anderson Bosa"
  const { level } = { level: 0 }
  
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