import { useContext } from 'react'
import { ChallengesContext } from '@/contexts/ChallengesContext'
import { UserContext } from '@/contexts/UserContext'
import styles from '@/styles/components/Profile.module.css'
import Level from '@/assets/level.svg'
import Image from 'next/image'

export function Profile () {
    const { user } = useContext(UserContext)
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <Image priority src={user?.image ?? 'https://i.pravatar.cc/256'} alt={user?.name ?? 'User avatar'} width={256} height={256} />
            <div>
                <strong>{user?.name}</strong>
                <p style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Image priority src={Level} alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}