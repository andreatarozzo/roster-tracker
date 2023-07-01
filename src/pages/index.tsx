import { Inter } from 'next/font/google'
import { DiscordLoginButton } from 'react-social-login-buttons'
import { signIn, useSession } from 'next-auth/react'
import { UserAuthStatus } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession();

  console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);
     
  if (status === UserAuthStatus.Authenticated) {
    console.log(session);
  }

  return (
    <div
      className={`flex min-h-screen p-24 ${inter.className}`}
    >
      <DiscordLoginButton
          onClick={() => signIn('discord')}
          size="45px"
          style={{ width: 'fit-content' }}
          align="center"
        />
    </div>
  )
}
