import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { UserProvider } from '@/contexts/UserContext'
import '@/styles/global.css'
import GitHubButton from '@/components/GitHubButton/GitHubButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Move.it',
  description: 'Boots your productivity and keep moving!',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          {children}
          <GitHubButton />
        </body>
      </html>
    </UserProvider>
  )
}
