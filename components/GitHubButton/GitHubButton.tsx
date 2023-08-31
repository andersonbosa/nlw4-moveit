'use client'

import Image from 'next/image'
import styles from './GitHubButton.module.css'

const GitHubButton = () => {
  return (
    <>
      <a
        href="https://github.com/andersonbosa/nlw4-moveit"
        target="_blank"
        className={styles.githubButton}
      >
        <div>
          <Image
            width={32}
            height={32}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="Check the repository on Github"
            title="Check the repository on Github"
          />
        </div>
      </a>
    </>
  )
}

export default GitHubButton
