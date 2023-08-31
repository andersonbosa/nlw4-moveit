import { UserContext } from '@/contexts/UserContext'
import styles from '@/styles/components/Sidebar.module.css'
import { FiAward, FiHome, FiLogOut } from 'react-icons/fi'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import ImgLogo from './ImgLogo'

export function Sidebar () {
    const router = useRouter()
    const { logout } = useContext(UserContext)

    const handleLogout = () => {
        logout()
        router.replace('/')
    }

    return (
        <motion.div className={styles.sidebarContainer}
            variants={{
                show: { opacity: 1, x: '0' },
                hidden: { opacity: 0, x: '-100%' },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <aside>
                <header>
                    <ImgLogo />
                </header>
                <div className={styles.iconsContainer}>
                    <div className={styles.iconHome}>
                        {usePathname() === '/home' ? (
                            <>
                                <Link href="/home">
                                    <FiHome className={styles.active} />
                                </Link>
                                <div className={styles.flagSidebar}></div>
                            </>
                        ) : (
                            <Link href="/home">

                                <FiHome />

                            </Link>
                        )}
                    </div>
                    <div className={styles.iconAward}>
                        {usePathname() === '/challenges' ? (
                            <>
                                <Link href="/challenges">

                                    <FiAward className={styles.active} />

                                </Link>
                                <div className={styles.flagSidebar}></div>
                            </>
                        ) : (
                            <Link href="/challenges">

                                <FiAward />

                            </Link>
                        )}
                    </div>
                </div>
                <footer>
                    <FiLogOut onClick={handleLogout} />
                </footer>
            </aside>
        </motion.div>
    )
}